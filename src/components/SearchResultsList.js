import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchResultElement from "./SearchResultElement";

function SearchResultsList(props) {
    return (props.pets.map((petObject) => (
        <SearchResultElement pet={petObject} breed={props.breed} key={petObject._id} />
    )))
}

export default connect()(withRouter(SearchResultsList));