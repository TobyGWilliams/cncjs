import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../lib/i18n';

import Modal from '../../../components/Modal';
import { Form, Input } from '../../../components/Validation';
import * as validations from '../../../lib/validations';

import styles from '../form.styl';
import { createMachine } from '../../../store/reducers';

export class CreateMachine extends PureComponent {
    static propTypes = {
        close: PropTypes.func
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
            createMachine(formData).then(this.props.close);
        });
    };

    render() {
        const { close } = this.props;
        const { validateAndSave } = this;
        return (
            <Modal size="sm" onClose={close}>
                <Modal.Header>
                    <Modal.Title>{i18n._('New Machine')}</Modal.Title>
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
                        <div className={styles.formGroup}>
                            <label>{i18n._('Name')}</label>
                            <Input
                                ref={node => {
                                    this.fields.name = node;
                                }}
                                type="text"
                                name="name"
                                className="form-control"
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
                                className="form-control"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>{i18n._('Maximum X')}</label>
                            <Input
                                ref={node => {
                                    this.fields.maxX = node;
                                }}
                                type="number"
                                name="maxX"
                                className="form-control"
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
                                className="form-control"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>{i18n._('Maximum Y')}</label>
                            <Input
                                ref={node => {
                                    this.fields.maxY = node;
                                }}
                                type="number"
                                name="maxY"
                                className="form-control"
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
                                className="form-control"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>{i18n._('Maximum Z')}</label>
                            <Input
                                ref={node => {
                                    this.fields.maxZ = node;
                                }}
                                type="number"
                                name="maxZ"
                                className="form-control"
                            />
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
