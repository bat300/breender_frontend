import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { DatePicker, Modal, Table, Typography } from 'antd';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import { Input, Form } from 'antd';
import DocumentsUpload from './upload/documents.upload';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { usePet } from 'helper/hooks/pets.hooks';
import { updateSelectedPet } from 'redux/actions';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const { Text, Link } = Typography;

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
const EditableCell = ({ title, focused, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(focused || false);
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

const prepareCompetitions = (competitions) => {
    let arr = competitions;
    arr.map((value) => {
        value.date = new Date(value.date);
        return value;
    });
    return arr;
};

const CompetitionsComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const pet = usePet();

    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [competitions, setCompetitions] = useState(pet ? prepareCompetitions(pet.competitions) : []);
    const [editedCompetitions, setEditedCompetitions] = useState(pet ? prepareCompetitions(pet.competitions) : []);

    const columnsData = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 'auto',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Text type="secondary">{record.name}</Text> : null),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            editable: false,
            render: (_, record) => (competitions.length >= 1 ? <Text type="secondary">{new Date(record.date).toLocaleDateString("de-DE")}</Text> : null),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Text type="secondary">{record.category}</Text> : null),
        },
        {
            title: 'Prize',
            dataIndex: 'prize',
            key: 'prize',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Text type="secondary">{record.prize}</Text> : null),
        },
        {
            title: 'Certificate',
            dataIndex: 'certificate',
            key: 'certificate',
            render: (_, record) => (competitions.length >= 1 ? <Text type="secondary">{record.certificate ? record.certificate.name : ' No File Uploaded'}</Text> : null),
        },
    ];

    const columnsModalData = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 'auto',
            editable: true,
            render: (_, record) => (competitions.length >= 1 ? <Input bordered={false} value={record.name} /> : null),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            editable: false,
            render: (_, record) =>
                competitions.length >= 1 ? (
                    <DatePicker value={moment(record.date, DATE_FORMAT)} bordered={false} onChange={(date) => changeDate(date, record)} format={DATE_FORMAT} />
                ) : null,
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
            render: (_, record) => (competitions.length >= 1 ? <DocumentsUpload type="competitions" competitionId={record.key} maxFiles={1} size={'small'} /> : null),
        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
            render: (_, record) =>
                competitions.length >= 1 ? (
                    <IconButton onClick={() => handleDelete(record.key)}>
                        <DeleteOutlinedIcon color="error" />
                    </IconButton>
                ) : null,
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = columnsModalData.map((col) => {
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
                focused: col.key === 'name' && record.name === '' ? true : false,
            }),
        };
    });

    // add new row
    const handleAdd = () => {
        const newData = { key: count, name: '', date: new Date(), category: '', prize: '', certificate: undefined };
        setCompetitions([...competitions, newData]);
        setCount(count + 1);

        let petData = pet;
        petData.competitions.push(newData);
        dispatch(updateSelectedPet(petData));
    };

    // delete row
    const handleDelete = (key) => {
        const newData = competitions.filter((item) => item.key !== key);
        setCompetitions(newData);
        setCount(count - 1);

        let petData = pet;
        petData.competitions = newData;
        dispatch(updateSelectedPet(petData));
    };

    // save competitions data
    const handleSave = (row) => {
        const newData = [...competitions];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setCompetitions(newData);

        let petData = pet;
        petData.competitions = newData;
        dispatch(updateSelectedPet(petData));
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

        let petData = pet;
        petData.competitions = newData;
        dispatch(updateSelectedPet(petData));
    };

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => {
        setEditedCompetitions(competitions);
        setIsModalVisible(false);
    };

    return (
        <div>
            <Grid container className={classes.layout}>
                <Grid item xs={12} sm={6}>
                    <label className={classes.label}>Competitions</label>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <Button
                        onClick={showModal}
                        variant="outlined"
                        color="primary"
                        style={{
                            margin: 10,
                        }}
                    >
                        Edit Table
                    </Button>
                </Grid>
            </Grid>
            <Table dataSource={editedCompetitions} columns={columnsData} />
            <Modal visible={isModalVisible} onOk={hideModal} onCancel={hideModal} className={classes.modal}>
                <Grid container alignItems="flex-end" justify="flex-end">
                        <Button
                            onClick={handleAdd}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 20,
                            }}
                        >
                            Add a row
                        </Button>
                </Grid>
                <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={competitions} columns={columns} />
            </Modal>
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
    modal: {
        display: 'flex',
        minWidth: '80vw',
        margin: '0 auto',
        marginTop: 100,
    },
}));

export default CompetitionsComponent;
