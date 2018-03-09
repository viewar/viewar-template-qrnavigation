import React from 'react';

import classNames from 'classnames';
import { compose, withProps, withState, withHandlers, pure, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';

import viewar from 'viewar-api';

import { removeInstancesByForeignKey } from "../../views/new/new.view";

import styles from './styles.css';

let newLiveRoute$, cancelLiveRoute$, saveLiveRoute$, newLiveRoutePoint$, newSceneState$;


const ListItem = ({ children, active, onClick }) => <div onClick={onClick} className={classNames(styles.listItem, active && styles.active)}>{children}</div>;
const List = ({ children }) => <div className={styles.list}>{children}</div>;
const ButtonBar = ({ children }) => <div className={styles.buttonBar}>{children}</div>;
const Label = ({ children, onClick }) => <div onClick={onClick} className={styles.label}>{children}</div>;

const Routes = ({ routes, handleRouteSelect, activeRoute, isAdmin, deleteRoute, editRouteName, showEditOptions }) =>
    <div className={styles.listWrapper}>
    <List>
      { Object.entries(routes)
        .filter(([label, { canceled }]) => !canceled)
        .sort((a, b) => {
          if(a[0] < b[0]) return -1;
          if(a[0] > b[0]) return 1;
          return 0;
        })
        .map(([label, route]) =>
          <ListItem key={label + Date.now()} active={activeRoute === label}>
            <Label onClick={() => handleRouteSelect(label)} >{label} {route.live && '[live]'}</Label>
            {showEditOptions && <ButtonBar>
              <Button onClick={() => editRouteName(label)} small>Edit</Button>
              <Button onClick={() => deleteRoute(label)} small>Remove</Button>
            </ButtonBar> }
          </ListItem>
        )
      }
    </List>
    </div>;

export default compose(
  withRouter,
  withState('routes', 'setRoutes', {}),
  withProps({
    viewar
  }),
  withProps(({ viewar }) => ({
    viewar,
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
  })),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleRouteDeselect: ({ routes, removeInstancesByForeignKey, activeRouteChanged }) => async () => {

      activeRouteChanged(null);
      return removeInstancesByForeignKey('ball');
    },
  }),
  withHandlers({
    handleRouteSelect: ({ routes, viewar, activeRouteChanged, handleRouteDeselect, activeRoute }) => async (label) => {

      if(label === activeRoute) {
        return handleRouteDeselect();
      }

      activeRouteChanged(label);

      if(routes[label].live) {
        viewar.socketConnection.send({ room: routes[label].sender, messageType: 'getSceneState', data: viewar.socketConnection.socket.id });
        return;
      }

      const sceneState = routes[label];
      const result = await viewar.sceneManager.setSceneState(sceneState);
    },
    deleteRoute: ({ viewar, setRoutes, activeRouteChanged }) => async (name) => {
      if(confirm('are you sure?')) {
        const newRoutes = await viewar.storageService.deleteKey({ path: '/public/routes/index.json', key: name});
        setRoutes(newRoutes);
      }
    },
    editRouteName: ({ viewar, setRoutes }) => async (oldName) => {
      const newName = prompt('Enter a new title', oldName);
      if(!newName) return;

      const newRoutes = await viewar.storageService.editKey({ path: '/public/routes/index.json', oldKey: oldName, newKey: newName });
      setRoutes(newRoutes);
    }
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, setRoutes, ballModel, activeRouteChanged } = this.props;

      const routes = await viewar.storage.cloud.read('/public/routes/index.json')  || {};
      setRoutes(routes);

      newLiveRoute$ = viewar.socketConnection.getData('newLiveRoute').subscribe(( { route, sender } ) => {
        setRoutes({ ...this.props.routes, [route]: { live: true, sender }})
      });

      cancelLiveRoute$ = viewar.socketConnection.getData('cancelLiveRoute').subscribe(async ( { route } ) => {
        setRoutes({ ...this.props.routes, [route]: { canceled: true }})
        if(route === this.props.activeRoute) {
          await viewar.sceneManager.clearScene();
          activeRouteChanged(null);
        }
      });

      saveLiveRoute$ = viewar.socketConnection.getData('saveLiveRoute').subscribe(async ({ route }) => {
        const routes = await viewar.storage.cloud.read('/public/routes/index.json') || {};
        setRoutes(routes);
      });

      newLiveRoutePoint$ = viewar.socketConnection.getData('newLiveRoutePoint').subscribe(( { route, pose } ) => {
        if(route === this.props.activeRoute) {
          return viewar.sceneManager.insertModel(ballModel, { pose } );
        }
      });

      newSceneState$ = viewar.socketConnection.getData('newSceneState').subscribe(async (sceneState) => {
        await viewar.sceneManager.setSceneState(sceneState);
      });

    },
    async componentWillUnmount() {
      const { removeInstancesByForeignKey } = this.props;
      await removeInstancesByForeignKey();

      newLiveRoute$ && newLiveRoute$.unsubscribe();
      cancelLiveRoute$ && cancelLiveRoute$.unsubscribe();
      saveLiveRoute$ && saveLiveRoute$.unsubscribe();
      newLiveRoutePoint$ && newLiveRoutePoint$.unsubscribe();
      newSceneState$ && newSceneState$.unsubscribe();

    },
  }),
  pure,
)(Routes);