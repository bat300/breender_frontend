import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import VerificationIcon from '../../components/VerificationIcon';
import CancelIcon from '@material-ui/icons/Cancel';
import { Tooltip } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        backgroundColor: theme.palette.primary.main,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing(1),
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
}));

function PetCompetitionsCard(props) {
    const classes = useStyles();

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardHeader action={
                    props.certificate.declined ?
                        <CancelIcon style={{ fill: 'red' }} />
                        : (<Tooltip trigger="hover" placement="top" title={props.verified ? "The document is verified." : "The document is NOT yet verified."}>
                            <div>
                                <VerificationIcon verified={props.certificate.verified} />
                            </div>
                        </Tooltip>)
                } />

                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.category}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.prize}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<GetAppIcon />}
                        component="a"
                        href={props.certificate.url ? props.certificate.url : null}
                        disabled={props.certificate.url ? false : true}
                    >
                        Certificate
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default PetCompetitionsCard;
