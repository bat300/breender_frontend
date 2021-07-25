import React from 'react';
import { makeStyles } from '@material-ui/core';

const PriceTag = (props) => {
    const { isSender, price, fee } = props;
    const MINUS = '- ';
    const PLUS = '+ ';

    const color = () => {
        if (isSender === true) return '#F96149';
        else if (isSender === false) return '#C0E189';
        else return 'black';
    };

    return (
        <div style={{ color: color(), fontWeight: 'bold', fontSize: 18 }}>
            {isSender === true ? `${MINUS}${price}€` : isSender === false ? `${PLUS}${price - fee}€` : `${price}€${fee > 0 ? ` (${fee}€ fee)` : ''}`}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({}));

export default PriceTag;
