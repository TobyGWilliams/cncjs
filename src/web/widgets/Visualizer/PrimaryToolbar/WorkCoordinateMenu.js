import React from 'react';
import PropTypes from 'prop-types';
import Dropdown, { MenuItem } from '../../../components/Dropdown';
import i18n from '../../../lib/i18n';

export const WorkCoordinateMenu = ({ canSendCommand, wcs, controller }) => (
    <Dropdown style={{ marginRight: 5 }} disabled={!canSendCommand} pullRight>
        <Dropdown.Toggle btnSize="sm" title={i18n._('Work Coordinate System')}>
            {wcs === 'G54' && `${wcs} (P1)`}
            {wcs === 'G55' && `${wcs} (P2)`}
            {wcs === 'G56' && `${wcs} (P3)`}
            {wcs === 'G57' && `${wcs} (P4)`}
            {wcs === 'G58' && `${wcs} (P5)`}
            {wcs === 'G59' && `${wcs} (P6)`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <MenuItem header>{i18n._('Work Coordinate System')}</MenuItem>
            <MenuItem
                active={wcs === 'G54'}
                onSelect={() => {
                    controller.command('gcode', 'G54');
                }}
            >
                G54 (P1)
            </MenuItem>
            <MenuItem
                active={wcs === 'G55'}
                onSelect={() => {
                    controller.command('gcode', 'G55');
                }}
            >
                G55 (P2)
            </MenuItem>
            <MenuItem
                active={wcs === 'G56'}
                onSelect={() => {
                    controller.command('gcode', 'G56');
                }}
            >
                G56 (P3)
            </MenuItem>
            <MenuItem
                active={wcs === 'G57'}
                onSelect={() => {
                    controller.command('gcode', 'G57');
                }}
            >
                G57 (P4)
            </MenuItem>
            <MenuItem
                active={wcs === 'G58'}
                onSelect={() => {
                    controller.command('gcode', 'G58');
                }}
            >
                G58 (P5)
            </MenuItem>
            <MenuItem
                active={wcs === 'G59'}
                onSelect={() => {
                    controller.command('gcode', 'G59');
                }}
            >
                G59 (P6)
            </MenuItem>
        </Dropdown.Menu>
    </Dropdown>
);

WorkCoordinateMenu.propTypes = {
    canSendCommand: PropTypes.bool,
    wcs: PropTypes.string,
    controller: PropTypes.object
};
