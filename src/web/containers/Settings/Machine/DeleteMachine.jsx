import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal';
import Space from '../../../components/Space';
import { Button } from '../../../components/Buttons';
import { deleteMachine } from '../../../store/reducers';

export const DeleteMachine = ({ close, machine }) => (
    <Modal size="xs" onClose={close}>
        <Modal.Header>
            <Modal.Title>
                Settings
                <Space width="8" />
                &rsaquo;
                <Space width="8" />
                Machine
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the machine?</Modal.Body>
        <Modal.Footer>
            <Button onClick={close}>Cancel</Button>
            <Button
                btnStyle="primary"
                onClick={() => {
                    deleteMachine(machine.id).then(close);
                }}
            >
                OK
            </Button>
        </Modal.Footer>
    </Modal>
);

DeleteMachine.propTypes = {
    close: PropTypes.func,
    machine: PropTypes.object
};
