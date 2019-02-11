import React from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import styles from './styles.css';

import { Button } from '../../components/Button';

export const Modal = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>{children}</div>
  </div>
);

export const InputModal = compose(
  withState('input', 'setInput', ''),
  withHandlers({
    handleOk: ({ input, onOk }) => () => {
      onOk && onOk(input);
    },
    handleCancel: ({ onCancel }) => () => {
      onCancel && onCancel();
    },
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.value) {
        this.props.setInput(this.props.value);
      }
    },
  })
)(
  ({
    handleOk,
    handleCancel,
    input,
    setInput,
    children,
    type = 'text',
    required,
    noInput,
  }) => (
    <Modal>
      <div className={styles.text}>{children}</div>
      {!noInput && (
        <input
          className={styles.input}
          type={type}
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
      )}
      <div className={styles.buttonBar}>
        <Button
          disabled={noInput && required && input === ''}
          className={styles.button}
          onClick={handleOk}
        >
          Ok
        </Button>
        <Button className={styles.button} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
);

export const InfoModal = compose(
  withHandlers({
    handleOk: ({ onOk }) => () => {
      onOk && onOk();
    },
  })
)(({ handleOk, children }) => (
  <Modal>
    <div className={styles.text}>{children}</div>
    <div className={styles.buttonBar}>
      <Button className={styles.button} onClick={handleOk}>
        Ok
      </Button>
    </div>
  </Modal>
));
