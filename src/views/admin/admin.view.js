import React from 'react';
import { compose, lifecycle, withHandlers, pure, withState, withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { streamStatus$ } from '../../services/websocket/stream-manager';

import { viewarConnect } from '../../lib/viewar-react';

import scan from '../../../assets/button_scan.svg';


const IconButton = styled.div`
  pointer-events: all;
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  margin: 0.5em;
`;

const SnapButton = styled(IconButton)`
  grid-area: sidebar;
  align-self: center;
`;

const Image = styled.img`
  pointer-events: all;
  margin: 0.2em;
  height: 100px;
  width: auto;
`;

const Gallery = styled.div`
  pointer-events: all;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;  
  grid-area: footer;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
    grid-template-areas: 
    "header header header"
    "sidebarleft main sidebar"
    "footer footer footer";
`

const Info = styled.div`
  background-color: white;
  width: 100px;
  height: 50px;
  margin: 0.5em;
  padding: 1em;
  grid-area: main;
  justify-self: center;
  align-self: center;
`

const AdminView = ({ saveFreezeFrameHandler, history, streamStatus, freezeFrames, showFreezeFrameHandler }) =>
  <Container>
    { !streamStatus && <Info>'Waiting for Connection'</Info>}
    { streamStatus && <SnapButton src={scan} onClick={saveFreezeFrameHandler} /> }
    { streamStatus && <Gallery>
      { 
        freezeFrames.map(freezeFrame => <Image src={freezeFrame.imageUrl} onClick={() => showFreezeFrameHandler(freezeFrame)} />)
      }
    </Gallery> }
  </Container>;

export default compose(
  viewarConnect(),
  withState('streamStatus', 'setStreamStatus', false),
  withState('freezeFrames', 'setFreezeFrames', ({ viewar }) => viewar.cameras.augmentedRealityCamera.freezeFrames ),
  withRouter,
  withHandlers({
    saveFreezeFrameHandler: ({ viewar: { cameras }, setFreezeFrames }) => async () => {
      await cameras.augmentedRealityCamera.freeze();
      const freezeFrame = await cameras.augmentedRealityCamera.saveFreezeFrame();
      setFreezeFrames(cameras.augmentedRealityCamera.freezeFrames);
      await cameras.augmentedRealityCamera.unfreeze();
    },
    showFreezeFrameHandler: ({ viewar: { cameras } }) => async (freezeFrame) => {
      await cameras.augmentedRealityCamera.activate();
      //await cameras.augmentedRealityCamera.freeze();
      await cameras.augmentedRealityCamera.showFreezeFrame(freezeFrame);
    },
  }),
  lifecycle({
    async componentWillMount() {

      streamStatus$.subscribe(this.props.setStreamStatus)

    }
  }),
  pure,
)(AdminView);