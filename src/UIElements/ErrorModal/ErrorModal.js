import React from 'react';

import Modal from '../Modal/Modal';

import './ErrorModal.css';

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            show={!!props.error}
            modalClosed={props.modalClosed}
        >
            <div className="error-header">An Error Occurred!</div>
            <p style={{ textAlign: 'center' }}>{props.error}</p>
        </Modal>
    )
}

export default ErrorModal;