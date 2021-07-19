import React from 'react';
import { makeStyles } from '@material-ui/core';

const PriceTag = (props) => {
    const { isSender, price } = props;
    const MINUS = '- ';
    const PLUS = '+ ';

    const color = () => {
        if (isSender) return 'red';
        else return 'green';
    };

    return (
        <div style={{ color: color(), fontWeight: 'lighter', fontSize: 18 }}>
            {`${isSender ? MINUS : PLUS}${price} €`}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({}));

export default PriceTag;
