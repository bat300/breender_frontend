import React from 'react';
import { makeStyles } from '@material-ui/core';

const PriceTag = (props) => {
    const { isSender, price } = props;
    const MINUS = '- ';
    const PLUS = '+ ';

    const color = () => {
        if (isSender === true) return '#F96149';
        else if (isSender === false) return '#C0E189';
        else return 'black';
    };

    return (
        <div style={{ color: color(), fontWeight: 400, fontSize: 18 }}>
            {`${isSender === true ? MINUS : isSender === false ? PLUS : ''}${price} €`}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({}));

export default PriceTag;
