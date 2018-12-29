import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import colornames from 'colornames';
import Detector from 'three/examples/js/Detector';

import Dropdown, { MenuItem } from '../../../components/Dropdown';
import i18n from '../../../lib/i18n';
import Space from '../../../components/Space';
import { Button } from '../../../components/Buttons';
import Interpolate from '../../../components/Interpolate';

export const VisualiserMenu = ({ disabled, actions, canToggleOptions, projection, objects, gcode }) => (
    <Dropdown pullRight>
        <Button
            btnSize="sm"
            btnStyle="flat"
            title={!Detector.webgl || disabled ? i18n._('Enable 3D View') : i18n._('Disable 3D View')}
            onClick={actions.toggle3DView}
        >
            {!Detector.webgl || disabled ? <i className="fa fa-toggle-off" /> : <i className="fa fa-toggle-on" />}
            {i18n._('3D View')}
        </Button>
        <Dropdown.Toggle btnSize="sm" />
        <Dropdown.Menu>
            <MenuItem style={{ color: '#222' }} header>
                <Interpolate
                    format={'WebGL: {{status}}'}
                    replacement={{
                        status: Detector.webgl ? (
                            <span style={{ color: colornames('royalblue') }}>{i18n._('Enabled')}</span>
                        ) : (
                            <span style={{ color: colornames('crimson') }}>{i18n._('Disabled')}</span>
                        )
                    }}
                />
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>{i18n._('Projection')}</MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toPerspectiveProjection}>
                <i className={classNames('fa', 'fa-fw', { 'fa-check': projection !== 'orthographic' })} />
                <Space width="4" />
                {i18n._('Perspective Projection')}
            </MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toOrthographicProjection}>
                <i className={classNames('fa', 'fa-fw', { 'fa-check': projection === 'orthographic' })} />
                <Space width="4" />
                {i18n._('Orthographic Projection')}
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>{i18n._('Scene Objects')}</MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toggleGCodeFilename}>
                {gcode.displayName ? <i className="fa fa-toggle-on fa-fw" /> : <i className="fa fa-toggle-off fa-fw" />}
                <Space width="4" />
                {i18n._('Display G-code Filename')}
            </MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toggleCoordinateSystemVisibility}>
                {objects.coordinateSystem.visible ? <i className="fa fa-toggle-on fa-fw" /> : <i className="fa fa-toggle-off fa-fw" />}
                <Space width="4" />
                {objects.coordinateSystem.visible ? i18n._('Hide Coordinate System') : i18n._('Show Coordinate System')}
            </MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toggleGridLineNumbersVisibility}>
                {objects.gridLineNumbers.visible ? <i className="fa fa-toggle-on fa-fw" /> : <i className="fa fa-toggle-off fa-fw" />}
                <Space width="4" />
                {objects.gridLineNumbers.visible ? i18n._('Hide Grid Line Numbers') : i18n._('Show Grid Line Numbers')}
            </MenuItem>
            <MenuItem disabled={!canToggleOptions} onSelect={actions.toggleToolheadVisibility}>
                {objects.toolhead.visible ? <i className="fa fa-toggle-on fa-fw" /> : <i className="fa fa-toggle-off fa-fw" />}
                <Space width="4" />
                {objects.toolhead.visible ? i18n._('Hide Toolhead') : i18n._('Show Toolhead')}
            </MenuItem>
        </Dropdown.Menu>
    </Dropdown>
);
VisualiserMenu.propTypes = {
    disabled: PropTypes.bool
};
