import React from 'react';
import { compose, withProps, withState, withHandlers, pure, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { viewarConnect } from '../../lib/viewar-react';


const ScanView = ({ module, history, isTracking }) =>
  <div>
  </div>

export default compose(
  viewarConnect(),
  withRouter,
  withState('isTracking', 'setIsTracking', false),
  withProps(
    ({ viewar, role }) => ({
      tracker: Object.values(viewar.trackers)[0],
      isRemoteTracker: !Object.keys(viewar.trackers).length || Object.keys(viewar.trackers)[0] === 'Remote',
    }),
  ),
  withHandlers({
    onQRScanned: ({ viewar, history}) => ({ id }) => {
      viewar.annotationService.selectedId = id;
      history.push('/main');
    }
  }),
  withHandlers({
    handleTracking: props => async (tracking) => {
      props.setIsTracking(tracking);
      props.onQRScanned({ id: 2 });
      //await props.viewar.sceneManager.scene.setVisible(tracking);
    },
  }),
  lifecycle({
    async componentWillMount() {
      const { viewar, tracker, handleTracking, onQRScanned, isAdmin} = this.props;
      const { sceneManager, cameras } = viewar;

      sceneManager.clearScene();

      await cameras.augmentedRealityCamera.activate();
      onQRScanned({ id: 2 });

      //tracker && tracker.on('trackingTargetStatusChanged', handleTracking);
    },
    async componentWillUnmount() {
      const { viewar, handleTracking, tracker } = this.props;
      //tracker && tracker.off('trackingTargetStatusChanged', handleTracking);

    },
  }),
  pure,
)(ScanView);