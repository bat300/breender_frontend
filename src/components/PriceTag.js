import React from 'react';
import { makeStyles } from '@material-ui/core';

const PriceTag = (props) => {
    const { isSender, price } = props;
    const MINUS = '- ';
    const PLUS = '+ ';

    const color = () => {
        if (isSender === true) return 'red';
        else if (isSender === false) return 'green';
        else return 'black';
    };

    return (
        <div style={{ color: color(), fontWeight: 'lighter', fontSize: 18 }}>
            {`${isSender === true ? MINUS : isSender === false ? PLUS : ''}${price} €`}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({}));

export default PriceTag;
