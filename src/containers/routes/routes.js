import React from 'react';

import classNames from 'classnames';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  pure,
  lifecycle,
  withPropsOnChange,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';

import { InputModal } from '../../containers/modal/modal';

import viewar from 'viewar-api';

import { removeInstancesByForeignKey } from '../../views/new/new.view';

import styles from './styles.css';

let newLiveRoute$,
  cancelLiveRoute$,
  saveLiveRoute$,
  newLiveRoutePoint$,
  newSceneState$;

const ListItem = ({ children, active, onClick }) => (
  <div
    onClick={onClick}
    className={classNames(styles.listItem, active && styles.active)}
  >
    {children}
  </div>
);
const List = ({ children }) => <div className={styles.list}>{children}</div>;
const ButtonBar = ({ children }) => (
  <div className={styles.buttonBar}>{children}</div>
);
const Label = ({ children, onClick }) => (
  <div onClick={onClick} className={styles.label}>
    {children}
  </div>
);

const Routes = ({
  routes,
  handleRouteSelect,
  activeRoute,
  isAdmin,
  showEditRoute,
  editRouteName,
  deleteRoute,
  showEditOptions,
  visible,
  setShowDeleteModal,
  showDeleteModal,
  showLabelModal,
  handleModalCancel,
}) => (
  <div className={classNames(styles.listWrapper, !visible && styles.isHidden)}>
    {showLabelModal && (
      <InputModal
        required
        onOk={editRouteName}
        value={showLabelModal}
        onCancel={handleModalCancel}
      >
        Enter a label for the route
      </InputModal>
    )}
    {showDeleteModal && (
      <InputModal noInput onOk={deleteRoute} onCancel={handleModalCancel}>
        Do you want to delete route '{showDeleteModal}'?
      </InputModal>
    )}

    <List>
      {Object.entries(routes)
        .filter(([label, { canceled }]) => !canceled)
        .sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        })
        .map(([label, route]) => (
          <ListItem key={label + Date.now()} active={activeRoute === label}>
            <Label onClick={() => handleRouteSelect(label)}>
              {label} {route.live && '[live]'}
            </Label>
            {showEditOptions && (
              <ButtonBar>
                <Button
                  onClick={() => showEditRoute(label)}
                  small
                  className={styles.button}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(label)}
                  small
                  className={styles.button}
                >
                  Remove
                </Button>
              </ButtonBar>
            )}
          </ListItem>
        ))}
    </List>
  </div>
);

export default compose(
  withRouter,
  withState('routes', 'setRoutes', {}),
  withState('showDeleteModal', 'setShowDeleteModal', false),
  withState('showLabelModal', 'setShowLabelModal', false),
  withProps({
    viewar,
  }),
  withProps(({ viewar }) => ({
    viewar,
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
  })),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleRouteDeselect: ({
      routes,
      removeInstancesByForeignKey,
      activeRouteChanged,
    }) => async () => {
      activeRouteChanged(null);
      return removeInstancesByForeignKey('ball');
    },
  }),
  withHandlers({
    handleRouteSelect: ({
      routes,
      viewar,
      activeRouteChanged,
      handleRouteDeselect,
      activeRoute,
    }) => async label => {
      if (label === activeRoute) {
        return handleRouteDeselect();
      }

      activeRouteChanged(label);

      if (routes[label].live) {
        viewar.socketConnection.send({
          room: routes[label].sender,
          messageType: 'getSceneState',
          data: viewar.socketConnection.socket.id,
        });
        return;
      }

      const sceneState = routes[label];
      const result = await viewar.sceneManager.setSceneState(sceneState);
    },
    handleModalCancel: ({ setShowLabelModal, setShowDeleteModal }) => () => {
      setShowDeleteModal(false);
      setShowLabelModal(false);
    },
    deleteRoute: ({
      viewar,
      setRoutes,
      setShowDeleteModal,
      showDeleteModal,
    }) => async () => {
      const newRoutes = await viewar.storageService.deleteKey({
        path: '/public/routes/index.json',
        key: showDeleteModal,
      });
      setShowDeleteModal(false);
      setRoutes(newRoutes);
    },
    showEditRoute: ({ setShowLabelModal }) => async oldName => {
      setShowLabelModal(oldName);
    },
    editRouteName: ({
      viewar,
      setRoutes,
      setShowLabelModal,
      showLabelModal,
    }) => async newName => {
      const newRoutes = await viewar.storageService.editKey({
        path: '/public/routes/index.json',
        oldKey: showLabelModal,
        newKey: newName,
      });
      setShowLabelModal(false);
      setRoutes(newRoutes);
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, setRoutes, ballModel, activeRouteChanged } = this.props;

      const routes =
        (await viewar.storage.cloud.read('/public/routes/index.json')) || {};
      setRoutes(routes);

      newLiveRoute$ = viewar.socketConnection
        .getData('newLiveRoute')
        .subscribe(({ route, sender }) => {
          setRoutes({ ...props.routes, [route]: { live: true, sender } });
        });

      cancelLiveRoute$ = viewar.socketConnection
        .getData('cancelLiveRoute')
        .subscribe(async ({ route }) => {
          setRoutes({ ...props.routes, [route]: { canceled: true } });
          if (route === props.activeRoute) {
            await viewar.sceneManager.clearScene();
            activeRouteChanged(null);
          }
        });

      saveLiveRoute$ = viewar.socketConnection
        .getData('saveLiveRoute')
        .subscribe(async ({ route }) => {
          const routes =
            (await viewar.storage.cloud.read('/public/routes/index.json')) ||
            {};
          setRoutes(routes);
        });

      newLiveRoutePoint$ = viewar.socketConnection
        .getData('newLiveRoutePoint')
        .subscribe(({ route, pose }) => {
          if (route === props.activeRoute) {
            return viewar.sceneManager.insertModel(ballModel, { pose });
          }
        });

      newSceneState$ = viewar.socketConnection
        .getData('newSceneState')
        .subscribe(async sceneState => {
          await viewar.sceneManager.setSceneState(sceneState);
        });
    },
    async componentWillUnmount() {
      await this.props.removeInstancesByForeignKey();

      newLiveRoute$ && newLiveRoute$.unsubscribe();
      cancelLiveRoute$ && cancelLiveRoute$.unsubscribe();
      saveLiveRoute$ && saveLiveRoute$.unsubscribe();
      newLiveRoutePoint$ && newLiveRoutePoint$.unsubscribe();
      newSceneState$ && newSceneState$.unsubscribe();
    },
  }),
  pure
)(Routes);
