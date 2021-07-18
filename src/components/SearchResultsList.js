import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchResultElement from './SearchResultElement';
import Grid from '@material-ui/core/Grid';

function sortByNewest() {
    return function (a, b) {
        return a.dateCreated < b.dateCreated && a.ownerId.subscriptionPlan < b.ownerId.subscriptionPlan ? 1 : -1;
    };
}

function sortByDescendingPrice() {
    return function (a, b) {
        return a.price < b.price && a.ownerId.subscriptionPlan < b.ownerId.subscriptionPlan ? 1 : -1;
    };
}

function sortByAscendingPrice() {
    return function (a, b) {
        return a.price > b.price && a.ownerId.subscriptionPlan < b.ownerId.subscriptionPlan ? 1 : -1;
    };
}

function sortBySubscription() {
    return function (a, b) {
        return a.ownerId.subscriptionPlan < b.ownerId.subscriptionPlan ? 1 : -1;
    };
}

function getResult(pets, order) {
    switch (order) {
        case 'ascending price':
            return pets.sort(sortByAscendingPrice());
        case 'descending price':
            return pets.sort(sortByDescendingPrice());
        case 'newest':
            return pets.sort(sortByNewest());
        default:
            return pets.sort(sortBySubscription());
    }
}

function SearchResultsList(props) {
    return props.pets.length > 0 ? (
        getResult(props.pets, props.order).map((petObject) => <SearchResultElement pet={petObject} key={petObject._id} />)
    ) : (
        <Grid container spacing={2} justify="center">
            <div style={{ fontSize: 30 }}>No results found</div>
        </Grid>
    );
}

export default connect()(withRouter(SearchResultsList));
