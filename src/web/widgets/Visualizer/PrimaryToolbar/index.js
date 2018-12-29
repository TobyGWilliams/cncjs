import React, { PureComponent } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Detector from 'three/examples/js/Detector';
import controller from '../../../lib/controller';
import i18n from '../../../lib/i18n';
import {
    // Grbl
    GRBL,
    GRBL_ACTIVE_STATE_IDLE,
    GRBL_ACTIVE_STATE_RUN,
    GRBL_ACTIVE_STATE_HOLD,
    GRBL_ACTIVE_STATE_DOOR,
    GRBL_ACTIVE_STATE_HOME,
    GRBL_ACTIVE_STATE_SLEEP,
    GRBL_ACTIVE_STATE_ALARM,
    GRBL_ACTIVE_STATE_CHECK,
    // Marlin
    MARLIN,
    // Smoothie
    SMOOTHIE,
    SMOOTHIE_ACTIVE_STATE_IDLE,
    SMOOTHIE_ACTIVE_STATE_RUN,
    SMOOTHIE_ACTIVE_STATE_HOLD,
    SMOOTHIE_ACTIVE_STATE_DOOR,
    SMOOTHIE_ACTIVE_STATE_HOME,
    SMOOTHIE_ACTIVE_STATE_ALARM,
    SMOOTHIE_ACTIVE_STATE_CHECK,
    // TinyG
    TINYG,
    TINYG_MACHINE_STATE_INITIALIZING,
    TINYG_MACHINE_STATE_READY,
    TINYG_MACHINE_STATE_ALARM,
    TINYG_MACHINE_STATE_STOP,
    TINYG_MACHINE_STATE_END,
    TINYG_MACHINE_STATE_RUN,
    TINYG_MACHINE_STATE_HOLD,
    TINYG_MACHINE_STATE_PROBE,
    TINYG_MACHINE_STATE_CYCLE,
    TINYG_MACHINE_STATE_HOMING,
    TINYG_MACHINE_STATE_JOG,
    TINYG_MACHINE_STATE_INTERLOCK,
    TINYG_MACHINE_STATE_SHUTDOWN,
    TINYG_MACHINE_STATE_PANIC,
    // Workflow
    WORKFLOW_STATE_IDLE
} from '../../../constants';
import styles from '../index.styl';
import store from '../../../store';
import { MachineMenu } from './MachineMenu';
import { WorkCoordinateMenu } from './WorkCoordinateMenu';
import { VisualiserMenu } from './VisualiserMenu';

const getWorkCoordinateSystem = (controllerType, controllerState) => {
    const defaultWCS = 'G54';

    if (controllerType === GRBL) {
        return _.get(controllerState, 'parserstate.modal.wcs') || defaultWCS;
    }

    if (controllerType === MARLIN) {
        return _.get(controllerState, 'modal.wcs') || defaultWCS;
    }

    if (controllerType === SMOOTHIE) {
        return _.get(controllerState, 'parserstate.modal.wcs') || defaultWCS;
    }

    if (controllerType === TINYG) {
        return _.get(controllerState, 'sr.modal.wcs') || defaultWCS;
    }

    return defaultWCS;
};

const canSendCommand = (port, controller, workflow) => {
    if (!port) {
        return false;
    }
    if (!controller.type || !controller.state) {
        return false;
    }
    if (workflow.state !== WORKFLOW_STATE_IDLE) {
        return false;
    }

    return true;
};

export default class PrimaryToolbar extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    renderControllerType() {
        const { state } = this.props;
        const controllerType = state.controller.type;

        return <div className={styles.controllerType}>{controllerType}</div>;
    }

    renderControllerState() {
        const { state } = this.props;
        const controllerType = state.controller.type;
        const controllerState = state.controller.state;
        let stateStyle = '';
        let stateText = '';

        if (controllerType === GRBL) {
            const activeState = _.get(controllerState, 'status.activeState');

            stateStyle = {
                [GRBL_ACTIVE_STATE_IDLE]: 'controller-state-default',
                [GRBL_ACTIVE_STATE_RUN]: 'controller-state-primary',
                [GRBL_ACTIVE_STATE_HOLD]: 'controller-state-warning',
                [GRBL_ACTIVE_STATE_DOOR]: 'controller-state-warning',
                [GRBL_ACTIVE_STATE_HOME]: 'controller-state-primary',
                [GRBL_ACTIVE_STATE_SLEEP]: 'controller-state-success',
                [GRBL_ACTIVE_STATE_ALARM]: 'controller-state-danger',
                [GRBL_ACTIVE_STATE_CHECK]: 'controller-state-info'
            }[activeState];

            stateText = {
                [GRBL_ACTIVE_STATE_IDLE]: i18n.t('controller:Grbl.activeState.idle'),
                [GRBL_ACTIVE_STATE_RUN]: i18n.t('controller:Grbl.activeState.run'),
                [GRBL_ACTIVE_STATE_HOLD]: i18n.t('controller:Grbl.activeState.hold'),
                [GRBL_ACTIVE_STATE_DOOR]: i18n.t('controller:Grbl.activeState.door'),
                [GRBL_ACTIVE_STATE_HOME]: i18n.t('controller:Grbl.activeState.home'),
                [GRBL_ACTIVE_STATE_SLEEP]: i18n.t('controller:Grbl.activeState.sleep'),
                [GRBL_ACTIVE_STATE_ALARM]: i18n.t('controller:Grbl.activeState.alarm'),
                [GRBL_ACTIVE_STATE_CHECK]: i18n.t('controller:Grbl.activeState.check')
            }[activeState];
        }

        if (controllerType === MARLIN) {
            // Marlin does not have machine state
        }

        if (controllerType === SMOOTHIE) {
            const activeState = _.get(controllerState, 'status.activeState');

            stateStyle = {
                [SMOOTHIE_ACTIVE_STATE_IDLE]: 'controller-state-default',
                [SMOOTHIE_ACTIVE_STATE_RUN]: 'controller-state-primary',
                [SMOOTHIE_ACTIVE_STATE_HOLD]: 'controller-state-warning',
                [SMOOTHIE_ACTIVE_STATE_DOOR]: 'controller-state-warning',
                [SMOOTHIE_ACTIVE_STATE_HOME]: 'controller-state-primary',
                [SMOOTHIE_ACTIVE_STATE_ALARM]: 'controller-state-danger',
                [SMOOTHIE_ACTIVE_STATE_CHECK]: 'controller-state-info'
            }[activeState];

            stateText = {
                [SMOOTHIE_ACTIVE_STATE_IDLE]: i18n.t('controller:Smoothie.activeState.idle'),
                [SMOOTHIE_ACTIVE_STATE_RUN]: i18n.t('controller:Smoothie.activeState.run'),
                [SMOOTHIE_ACTIVE_STATE_HOLD]: i18n.t('controller:Smoothie.activeState.hold'),
                [SMOOTHIE_ACTIVE_STATE_DOOR]: i18n.t('controller:Smoothie.activeState.door'),
                [SMOOTHIE_ACTIVE_STATE_HOME]: i18n.t('controller:Smoothie.activeState.home'),
                [SMOOTHIE_ACTIVE_STATE_ALARM]: i18n.t('controller:Smoothie.activeState.alarm'),
                [SMOOTHIE_ACTIVE_STATE_CHECK]: i18n.t('controller:Smoothie.activeState.check')
            }[activeState];
        }

        if (controllerType === TINYG) {
            const machineState = _.get(controllerState, 'sr.machineState');

            // https://github.com/synthetos/g2/wiki/Alarm-Processing
            stateStyle = {
                [TINYG_MACHINE_STATE_INITIALIZING]: 'controller-state-warning',
                [TINYG_MACHINE_STATE_READY]: 'controller-state-default',
                [TINYG_MACHINE_STATE_ALARM]: 'controller-state-danger',
                [TINYG_MACHINE_STATE_STOP]: 'controller-state-default',
                [TINYG_MACHINE_STATE_END]: 'controller-state-default',
                [TINYG_MACHINE_STATE_RUN]: 'controller-state-primary',
                [TINYG_MACHINE_STATE_HOLD]: 'controller-state-warning',
                [TINYG_MACHINE_STATE_PROBE]: 'controller-state-primary',
                [TINYG_MACHINE_STATE_CYCLE]: 'controller-state-primary',
                [TINYG_MACHINE_STATE_HOMING]: 'controller-state-primary',
                [TINYG_MACHINE_STATE_JOG]: 'controller-state-primary',
                [TINYG_MACHINE_STATE_INTERLOCK]: 'controller-state-warning',
                [TINYG_MACHINE_STATE_SHUTDOWN]: 'controller-state-danger',
                [TINYG_MACHINE_STATE_PANIC]: 'controller-state-danger'
            }[machineState];

            stateText = {
                [TINYG_MACHINE_STATE_INITIALIZING]: i18n.t('controller:TinyG.machineState.initializing'),
                [TINYG_MACHINE_STATE_READY]: i18n.t('controller:TinyG.machineState.ready'),
                [TINYG_MACHINE_STATE_ALARM]: i18n.t('controller:TinyG.machineState.alarm'),
                [TINYG_MACHINE_STATE_STOP]: i18n.t('controller:TinyG.machineState.stop'),
                [TINYG_MACHINE_STATE_END]: i18n.t('controller:TinyG.machineState.end'),
                [TINYG_MACHINE_STATE_RUN]: i18n.t('controller:TinyG.machineState.run'),
                [TINYG_MACHINE_STATE_HOLD]: i18n.t('controller:TinyG.machineState.hold'),
                [TINYG_MACHINE_STATE_PROBE]: i18n.t('controller:TinyG.machineState.probe'),
                [TINYG_MACHINE_STATE_CYCLE]: i18n.t('controller:TinyG.machineState.cycle'),
                [TINYG_MACHINE_STATE_HOMING]: i18n.t('controller:TinyG.machineState.homing'),
                [TINYG_MACHINE_STATE_JOG]: i18n.t('controller:TinyG.machineState.jog'),
                [TINYG_MACHINE_STATE_INTERLOCK]: i18n.t('controller:TinyG.machineState.interlock'),
                [TINYG_MACHINE_STATE_SHUTDOWN]: i18n.t('controller:TinyG.machineState.shutdown'),
                [TINYG_MACHINE_STATE_PANIC]: i18n.t('controller:TinyG.machineState.panic')
            }[machineState];
        }

        return <div className={classNames(styles.controllerState, styles[stateStyle])}>{stateText}</div>;
    }

    render() {
        const { state, actions } = this.props;
        const { disabled, gcode, projection, objects } = state;
        const machines = _.get(store, 'state.machines');

        const workCoordinateProps = {
            canSendCommand: canSendCommand(_.get(state, 'port'), _.get(state, 'controller'), _.get(state, 'workflow')),
            wcs: getWorkCoordinateSystem(_.get(state, 'controller.type'), _.get(state, 'controller.state')),
            controller
        };
        const visualiserProps = { disabled, actions, canToggleOptions: Detector.webgl && !disabled, projection, objects, gcode };

        return (
            <div className={styles.primaryToolbar}>
                {this.renderControllerType()}
                {this.renderControllerState()}
                <div className="pull-right">
                    <MachineMenu machines={machines} />
                    <WorkCoordinateMenu {...workCoordinateProps} />
                    <VisualiserMenu {...visualiserProps} />
                </div>
            </div>
        );
    }
}
