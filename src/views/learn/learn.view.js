import React from 'react';
import {compose, withHandlers, pure, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button } from '../../components/Button';

import { withViewar } from '../../lib/viewar-react';

import TrackingSystemQRLearn from '../../containers/tracking-system/tracking-system-qr-learn';
import { Container } from "../../components/FullScreenContainer";
import { InfoModal, InputModal } from "../../containers/modal/modal";
import { removeInstancesByForeignKey } from "../new/new.view";

import axios from 'axios';

import styles from './styles.css';

const LearnView = ({ infoMessage, setInfoMessage, showPasswordModal, setShowPasswordModal, QRCodes, handleUpload, handleBack, initialized, setInitialized, handleNewQRCodes }) =>
  <Container>
    { showPasswordModal && <InputModal required type="password" onOk={handleUpload} onCancel={() => setShowPasswordModal(false)}>Enter your account password</InputModal> }
    { infoMessage && <InfoModal onOk={() => setInfoMessage(null)}>{ infoMessage }</InfoModal> }
    <div className={styles.upperLeftBar}>
      <Button onClick={handleBack}>Back</Button>
    </div>
    <TrackingSystemQRLearn initializationStatusChanged={setInitialized} onScan={handleNewQRCodes} />
    { initialized && <div className={styles.qrList}>
      <div>
      { QRCodes.map((QRCode, i) =>
        <div key={i} className={styles.qrListItem} >
          { QRCode.name }
        </div>
      )}
      </div>
      <Button disabled={!QRCodes.length} onClick={() => setShowPasswordModal(true)}>Upload QRCodes</Button>
    </div> }
  </Container>

export default compose(
  withViewar(),
  withRouter,
  withState('infoMessage', 'setInfoMessage', null),
  withState('showPasswordModal', 'setShowPasswordModal', false),
  withState('initialized', 'setInitialized', false),
  withState('QRCodes', 'setQRCodes', []),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleBack: ({ history }) => () => {
      history.push('/admin');
    },
    handleNewQRCodes: ({ setQRCodes }) => (newQRCodes) => {
      setQRCodes(newQRCodes);
    },
    handleUpload: ({ QRCodes, setInfoMessage, setShowPasswordModal, viewar }) => async (password) => {
      setShowPasswordModal(false);

      const { appId, version } = viewar.appConfig;

      const payload = new FormData();
      payload.append('password', password);
      payload.append('QRCodes', JSON.stringify(QRCodes));
      payload.append('bundleIdentifier', appId);
      payload.append('bundleVersion', version.app);

      const response = await axios.post(
        'http://dev2.viewar.com/templates/custom/qrnavigation/action:saveQRCodes/',
        payload,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

      setInfoMessage(response.data.message);
    }
  }),
  pure,
)(LearnView);