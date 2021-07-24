import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TransactionsAdminOverviewTable from 'components/transactions/TransactionsAdminOverviewTable';
import DocumentsArray from '../components/DocumentsArray';
import { Tabs } from 'antd';
import { getDeclinedDocuments, getDocuments, getVerifiedDocuments} from 'redux/actions/documentActions';
import { useUser } from 'helper/hooks';

const { TabPane } = Tabs;



const AdminConsoleView = (props) => {
    const classes = useStyles();
    const user = useUser();
    const [activeTab, setActiveTab] = React.useState('1');
    const [loading, setLoading] = React.useState(true); //for trigering reload of the documents


    const onChangeTab = activeKey => {
        setActiveTab(activeKey);
        setLoading(true);
  };
 

    return (
        <Tabs activeKey={activeTab} centered onChange={onChangeTab}>
            
   <TabPane tab="Pending Documents" key="1">
    <div className={classes.childLayout}>
                <DocumentsArray getDocuments={getDocuments} active={activeTab === '1'} loading={loading} setLoading={setLoading}/>
            </div>
    </TabPane>
    <TabPane tab="Verified Documents" key="2">
    <div className={classes.childLayout}>
                <DocumentsArray getDocuments={getVerifiedDocuments} active={activeTab === '2'} loading={loading} setLoading={setLoading}/>
            </div>
    </TabPane>
    <TabPane tab="Declined Documents" key="3">
    <div className={classes.childLayout}>
                <DocumentsArray getDocuments={getDeclinedDocuments} active={activeTab === '3'} loading={loading} setLoading={setLoading}/>
            </div>
    </TabPane>
    <TabPane tab="Transactions" key="4">
    <div className={classes.childLayout}>
    <TransactionsAdminOverviewTable active={activeTab === '4'} user={user}/>
            </div>
    </TabPane>
  </Tabs>);
    };

const useStyles = makeStyles((theme) => ({
    childLayout: {
        width: '90vw',
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    layout: {
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
}));

export default connect()(withRouter(AdminConsoleView));
