import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Tooltip } from 'antd';
import { VerificationIcon, CancelIcon } from 'components/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: 10,
        backgroundColor: '#7D7F9A',
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)',
        color: 'white',
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
    label: {
        color: theme.palette.text.light,
    },
}));

function PetCompetitionsCard(props) {
    const classes = useStyles();

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardHeader action={
                    props.certificate.declined ?
                        (<Tooltip trigger="hover" placement="top" title={"The document is checked and DECLINED."}>
                            <div>
                                <CancelIcon style={{ fill: 'red' }} />
                            </div>
                        </Tooltip>)
                        : (<Tooltip trigger="hover" placement="top" title={props.verified ? "The document is verified." : "The document is NOT yet verified."}>
                            <div>
                                <VerificationIcon verified={props.certificate.verified} />
                            </div>
                        </Tooltip>)
                } />

                <CardContent>
                    <Typography variant="h5" className={classes.label} color="textSecondary">
                        {props.name}
                    </Typography>
                    <Typography className={`${classes.pos}`} color="textSecondary">
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
