import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../lib/i18n';
import * as validations from '../../../lib/validations';

import Modal from '../../../components/Modal';
import { Form, Input } from '../../../components/Validation';
import { editMachine } from '../../../store/reducers';

import styles from '../form.styl';

export class EditMachine extends PureComponent {
    propTypes = {
        close: PropTypes.func,
        machine: PropTypes.object
    };

    fields = {
        name: null,
        minX: null,
        maxX: null,
        minY: null,
        maxY: null,
        minZ: null,
        maxZ: null
    };

    validateAndSave = () => {
        this.form.validate(err => {
            if (err) {
                return;
            }
            const formData = this.form.getValues();
            editMachine({ ...formData, id: this.props.machine.id }).then(this.props.close);
        });
    };

    render() {
        const { close, machine } = this.props;
        const { validateAndSave } = this;
        return (
            <Modal size="sm" onClose={close}>
                <Modal.Header>
                    <Modal.Title>{i18n._('Edit Machine')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        ref={node => {
                            this.form = node;
                        }}
                        onSubmit={event => {
                            event.preventDefault();
                        }}
                    >
                        <div className={styles.formFields}>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Name')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.name = node;
                                    }}
                                    type="text"
                                    name="name"
                                    value={machine.name}
                                    validations={[validations.required]}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Minimum X')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.minX = node;
                                    }}
                                    type="number"
                                    name="minX"
                                    value={machine.minX}
                                />
                                <label>{i18n._('Maximum X')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.maxX = node;
                                    }}
                                    type="number"
                                    name="maxX"
                                    value={machine.maxX}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Minimum Y')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.minY = node;
                                    }}
                                    type="number"
                                    name="minY"
                                    value={machine.minY}
                                />
                                <label>{i18n._('Maximum Y')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.maxY = node;
                                    }}
                                    type="number"
                                    name="maxY"
                                    value={machine.maxY}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Minimum Z')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.minZ = node;
                                    }}
                                    type="number"
                                    name="minZ"
                                    value={machine.minZ}
                                />
                                <label>{i18n._('Maximum Z')}</label>
                                <Input
                                    ref={node => {
                                        this.fields.maxZ = node;
                                    }}
                                    type="number"
                                    name="maxZ"
                                    value={machine.maxZ}
                                />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={close}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={validateAndSave}>
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
