import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'antd';

const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: '50%',
        objectFit: 'cover',
        border: `2px solid ${theme.palette.primary.main}`,
    },
    layout: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(4),
    }
}));

function CircleProfileImage(props) {
    const classes = useStyles();
    return <div className={classes.layout}><Image height={240} width={240} className={classes.image} src={props.imageUrl} /></div>;
}

export default CircleProfileImage;
