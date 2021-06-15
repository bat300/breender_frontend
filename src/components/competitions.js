import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { DatePicker, Table } from 'antd';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Input, Form } from 'antd';
import DocumentsUpload from './upload/documents.upload';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateCompetitions } from 'redux/actions';

const EditableContext = createContext(null);
const DATE_FORMAT = 'DD.MM.YYYY';

// Define editable row form
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

// Define editable cell
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    // focus on editing cell
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    // save edited values
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {}
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const CompetitionsComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    const [competitions, setCompetitions] = useState([]);

    const columnsData = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Input bordered={false} value={record.name} /> : null),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            editable: false,
            render: (_, record) =>
                competitions.length >= 1 ? <DatePicker value={moment(record.date, DATE_FORMAT)} bordered={false} onChange={(date) => changeDate(date, record)} format={DATE_FORMAT} /> : null,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Input bordered={false} value={record.category} /> : null),
        },
        {
            title: 'Prize',
            dataIndex: 'prize',
            key: 'prize',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Input bordered={false} value={record.prize} /> : null),
        },
        {
            title: 'Certificate',
            dataIndex: 'certificate',
            key: 'certificate',
            render: (_, record) => (competitions.length >= 1 ? <DocumentsUpload maxFiles={1} size={'small'} /> : null),
        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
            render: (_, record) =>
                competitions.length >= 1 ? (
                    <Button size="small" variant="text" color="primary" onClick={() => handleDelete(record.key)}>
                        Remove
                    </Button>
                ) : null,
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = columnsData.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    // add new row
    const handleAdd = () => {
        const newData = { key: count, name: '', date: new Date(), category: '', prize: '', certificate: {} };
        setCompetitions([...competitions, newData]);
        setCount(count + 1);
    };

    // delete row
    const handleDelete = (key) => {
        const newData = competitions.filter((item) => item.key !== key);
        setCompetitions(newData);
        setCount(count - 1);
    };

    const handleSave = (row) => {
        const newData = [...competitions];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setCompetitions(newData);

        dispatch(updateCompetitions(newData));
    };

    // handle change of the competition date
    const changeDate = (date, record) => {
        const newData = [...competitions];
        newData.map((item) => {
            if (record.key === item.key) {
                item.date = new Date(date);
            }
            return item;
        });
        setCompetitions(newData);
        dispatch(updateCompetitions(newData));
    };

    return (
        <div>
            <Grid container className={classes.layout}>
                <Grid item xs={12} sm={6}>
                    <label className={classes.label}>Competitions</label>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <Button
                        onClick={handleAdd}
                        variant="outlined"
                        color="primary"
                        style={{
                            margin: 10,
                        }}
                    >
                        Add a row
                    </Button>
                </Grid>
            </Grid>
            {/* make table scrollbar */}
            <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={competitions} columns={columns} scroll={{ x: 1300 }} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 500,
    },
    grid: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
}));

export default CompetitionsComponent;
