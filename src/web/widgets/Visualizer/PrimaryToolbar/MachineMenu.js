import React from 'react';
import { get, find } from 'lodash';
import Dropdown, { MenuItem } from '../../../components/Dropdown';
import { Button } from '../../../components/Buttons';

import { selectMachine } from '../../../store/reducers';

export const MachineMenu = ({ machines }) => (machines ? (
    <Dropdown style={{ marginRight: 5 }} pullRight>
        <Button btnSize="sm" btnStyle="flat" title="View Machine Travel">
            {get(find(machines, 'selected'), 'name')}
            {/* {i18n._('Machine Name')} */}
        </Button>
        <Dropdown.Toggle btnSize="sm" />
        <Dropdown.Menu>
            {Object.keys(machines).map((item, i) => (
                <MenuItem
                    key={item}
                    onSelect={() => {
                        selectMachine(item);
                    }}
                >
                    {machines[item].name}
                </MenuItem>
            ))}
        </Dropdown.Menu>
    </Dropdown>
) : null);
