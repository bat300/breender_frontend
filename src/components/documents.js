import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
// antd imports
import 'antd/dist/antd.css';
import { Modal, Popconfirm, Table, Typography } from 'antd';
import { Input, Form } from 'antd';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// components import
import DocumentsUpload from './upload/documents.upload';
// redux imports
import { updateCompetitionsToUpload as updateDocumentsToUpload } from 'redux/actions';
import { usePet, usePetCompetitions as usePetDocuments } from 'helper/hooks/pets.hooks';
// services import
import { NotificationService } from 'services';

const { Text } = Typography;

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
        } catch (errInfo) {
            handleSave({ ...record, ...errInfo.values });
        }
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
    arr.map((value, index) => {
        value.key = index;
        value.date = new Date(value.date);
        return value;
    });
    return arr;
};

const DocumentsComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { mode } = props;

    const pet = usePet();
    const documentsData = usePetDocuments();

    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // competitions on the modal
    const [documents, setDocuments] = useState(mode === 'add' ? [] : prepareCompetitions(pet.documents));
    // competitions on the edit page
    const [editedDocuments, setEditedDocuments] = useState(mode === 'add' ? [] : prepareCompetitions(pet.documents));

    const columnsData = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            fixed: 'left',
            width: '50%',
            editable: true,
            render: (_, record) => (documents.length >= 1 ? <Text type="secondary">{record.description}</Text> : null),
        },
        {
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
            render: (_, record) => (documents.length >= 1 ? <Text type="secondary">{record ? record.name : ' No File Uploaded'}</Text> : null),
        },
    ];

    // columns data for the competitions in the modal
    const columnsModalData = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            fixed: 'left',
            width: '50%',
            editable: true,
            render: (_, record) => (documents.length >= 1 ? <Input bordered={false} value={record.description} /> : null),
        },
        {
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
            width: '40%',
            render: (_, record) => (documents.length >= 1 ? <DocumentsUpload type="documents" documentId={record.key} maxFiles={1} size={'small'} description={record.description} /> : null),
        },
        {
            title: 'Remove',
            key: 'remove',
            render: (key) =>
                documents.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(key)}>
                        <IconButton>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </Popconfirm>
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
        const newData = { key: count, description: '', date: new Date(), document: undefined };
        setDocuments([...documents, newData]);
        setCount(count + 1);

        dispatch(updateDocumentsToUpload([...documents, newData]));
    };

    // delete row
    const handleDelete = (key) => {
        const newData = documents.filter((item) => item.key !== key.key);
        setDocuments(newData);
        setCount(count - 1);

        dispatch(updateDocumentsToUpload(newData));
    };

    // save competitions data
    const handleSave = (row) => {
        const newData = [...documents];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDocuments(newData);

        dispatch(updateDocumentsToUpload(newData));
    };

    const showModal = () => setIsModalVisible(true);

    const hideModal = () => {
        dispatch(updateDocumentsToUpload(editedDocuments));
        setDocuments(editedDocuments);
        setIsModalVisible(false);
        setCount(editedDocuments.length);
    };

    const onOk = () => {
        // check if all columns of all competitions are filled out
        let verified = true;
        const isEmpty = (c) => c.description === '' || document === undefined || c.document === {};
        documentsData.forEach((item) => {
            if (isEmpty(item)) {
                verified = false;
                return;
            }
        });
        if (verified) {
            dispatch(updateDocumentsToUpload(documents));
            setEditedDocuments(documents);
            setIsModalVisible(false);
            setCount(documents.length);
        } else {
            NotificationService.notify('error', 'All fields required', 'Please fill out all columns for the documents!');
        }
    };

    return (
        <div>
            <Grid container className={classes.layout}>
                <Grid item xs={12} sm={6}>
                    <label className={classes.label}>Additional Documents (birth certificate, etc.)</label>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <Button
                        onClick={showModal}
                        variant="outlined"
                        color="secondary"
                        style={{
                            margin: 10,
                        }}
                    >
                        Edit Documents
                    </Button>
                </Grid>
            </Grid>
            <Table dataSource={editedDocuments} columns={columnsData} />
            {/* Modal for editable competitions table */}
            <Modal visible={isModalVisible} onOk={onOk} onCancel={hideModal} className={classes.modal} width={'80vw'}>
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
                <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={documents} columns={columns} style={{ width: '80vw' }} />
            </Modal>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
}));

export default connect()(DocumentsComponent);
