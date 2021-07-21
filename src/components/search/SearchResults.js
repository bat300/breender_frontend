import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';
import SearchResultsList from './SearchResultsList';

function SearchResults(props) {
    return !props.pets ? <Loading /> : !Array.isArray(props.pets.pets) ? <div>error</div> : <SearchResultsList pets={props.pets.pets} order={props.order} />;
}

export default connect()(withRouter(SearchResults));
