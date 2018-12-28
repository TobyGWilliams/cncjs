import { keys, mapValues } from 'lodash';
import store from './index';

const formMachineToStore = machine => {
    const output = { name: machine.name, selected: machine.selected };

    ['minX', 'maxX', 'minY', 'maxY', 'minZ', 'maxZ'].forEach(formField => {
        const formOutput = machine[formField];
        output[formField] = formOutput === '' ? null : Number(formOutput);
    });
    return output;
};

export const deleteMachine = machineId => new Promise(resolve => {
    store.unset(`machines.${machineId}`);
    store.persist();
    resolve();
});

export const editMachine = machine => new Promise(resolve => {
    const machines = store.get('machines');

    store.set('machines', Object.assign({}, ...machines, { [machine.id]: formMachineToStore(machine) }));
    store.persist();
    resolve();
});

export const createMachine = machine => new Promise(resolve => {
    const machines = store.get('machines');
    const newKey = Math.max(...keys(machines).map(x => Number(x))) + 1;

    store.set('machines', Object.assign({}, ...machines, { [newKey]: formMachineToStore(machine) }));
    store.persist();
    resolve();
});

export const selectMachine = machineId => new Promise(resolve => {
    const machines = store.get('machines');

    // mapValues returns a new object, so this is safe to use with using Object Assign.
    store.set('machines', mapValues(machines, (value, key) => ({ ...value, selected: machineId === key })));
    store.persist();
    resolve();
});
