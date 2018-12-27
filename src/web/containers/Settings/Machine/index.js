import React from 'react';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

import Table from '../../../components/Table';
import Space from '../../../components/Space';
import { CreateMachine } from './CreateMachine';
import { EditMachine } from './EditMachine';
import { DeleteMachine } from './DeleteMachine';

import styles from './index.styl';

const objectToArray = array => values(
    mapValues(array, (value, key) => {
        value.id = key;
        return value;
    })
);

export class Machine extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { createDialog: false, editDialog: false, deleteDialog: null, editMachine: null, deleteMachine: null };
    }

    openCreateMachine = () => {
        this.setState({ ...this.state, createDialog: true });
    };

    closeCreateMachine = () => {
        this.setState({ createDialog: false });
    };

    openEditDialog = machine => {
        this.setState({ ...this.state, editDialog: true, editMachine: machine });
    };

    closeEditDialog = () => {
        this.setState({ ...this.state, editDialog: false });
    };

    openDeleteDialog = machine => {
        this.setState({ ...this.state, deleteDialog: true, deleteMachine: machine });
    };

    closeDeleteDialog = () => {
        this.setState({ ...this.state, deleteDialog: false });
    };

    render() {
        const { machines } = this.props;
        const { createDialog, editDialog, deleteDialog } = this.state;
        const title = (
            <div className={styles.tableToolbar}>
                <button type="button" className="btn btn-default" onClick={this.openCreateMachine}>
                    <i className="fa fa-plus" />
                    <Space width="8" />
                    New
                </button>
            </div>
        );
        const tableProps = {
            bordered: false,
            justified: false,
            title,
            data: objectToArray(machines),
            rowKey: record => record.id,
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    render: (value, row, index) => row.name
                },
                {
                    title: 'Minimum X',
                    key: 'minX',
                    render: (value, row, index) => row.minX
                },
                {
                    title: 'Maximum X',
                    key: 'maxX',
                    render: (value, row, index) => row.maxX
                },
                {
                    title: 'Minimum Y',
                    key: 'minY',
                    render: (value, row, index) => row.minY
                },
                {
                    title: 'Maximum Y',
                    key: 'maxY',
                    render: (value, row, index) => row.maxY
                },
                {
                    title: 'Minimum Z',
                    key: 'minZ',
                    render: (value, row, index) => row.minZ
                },
                {
                    title: 'Maximum Z',
                    key: 'maxZ',
                    render: (value, row, index) => row.maxZ
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (value, row, index) => (
                        <div>
                            <button
                                type="button"
                                className="btn btn-xs btn-default"
                                title="Edit Machine"
                                onClick={() => {
                                    this.openEditDialog(row);
                                }}
                            >
                                <i className="fa fa-fw fa-edit" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-xs btn-default"
                                title="Delete Machine"
                                onClick={() => {
                                    this.openDeleteDialog(row);
                                }}
                            >
                                <i className="fa fa-fw fa-trash" />
                            </button>
                        </div>
                    )
                }
            ]
        };
        const createMachineProps = {
            close: this.closeCreateMachine
        };
        const editMachineProps = {
            machine: this.state.editMachine,
            close: this.closeEditDialog
        };
        const deleteMachineProps = {
            machine: this.state.deleteMachine,
            close: this.closeDeleteDialog
        };

        return (
            <div style={{ margin: -15 }}>
                {createDialog && <CreateMachine {...createMachineProps} />}
                {editDialog && <EditMachine {...editMachineProps} />}
                {deleteDialog && <DeleteMachine {...deleteMachineProps} />}
                <Table {...tableProps} />
            </div>
        );
    }
}
