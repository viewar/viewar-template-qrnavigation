import React from 'react';
import {compose, withHandlers, pure, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button } from '../../components/Button';

import { withViewar } from '../../lib/viewar-react';

import TrackingSystemQRLearn from '../../containers/tracking-system/tracking-system-qr-learn';
import { Container } from "../../components/FullScreenContainer";
import { InfoModal, InputModal } from "../../containers/modal/modal";
import { removeInstancesByForeignKey } from "../new/new.view";

import styles from './styles.css';

const LearnView = ({ error, setError, showPasswordModal, setShowPasswordModal, QRCodes, handleUpload, handleBack, initialized, setInitialized, handleNewQRCodes }) =>
  <Container>
    { showPasswordModal && <InputModal required type="password" onOk={handleUpload} onCancel={() => setShowPasswordModal(false)}>Enter your account password</InputModal> }
    { error && <InfoModal onOk={() => setError(null)}>{ error }</InfoModal> }
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
  withState('error', 'setError', null),
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
    handleNewQRCodes: ({ setQRCodes, QRCodes }) => (newQRCodes) => {
      setQRCodes(newQRCodes);
    },
    handleUpload: ({ QRCodes, setError, setShowPasswordModal }) => (password) => {
      setShowPasswordModal(false);
      //TODO talk to API with given password
      setError('Password is wrong');
    }
  }),
  pure,
)(LearnView);