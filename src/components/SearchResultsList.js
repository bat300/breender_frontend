import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchResultElement from './SearchResultElement';
import Grid from '@material-ui/core/Grid';

function SearchResultsList(props) {
    return props.pets.length > 0? props.pets.map((petObject) => <SearchResultElement pet={petObject} key={petObject._id} />) : 
    <Grid container spacing={2} justify="center"><div style={{fontSize: 30}}>No results found</div></Grid>;

}

export default connect()(withRouter(SearchResultsList));
