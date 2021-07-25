import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, Table, TableCell, TableRow, Typography } from '@material-ui/core';
import PayPalPayment from './PayPalPayment';

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flex: 1,
        maxWidth: '100%',
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 170,
    },
}));

const StepperInformation = ({ step, pet, petOwner, loggedInUser, isFreeOfCharge, onApprove, onError }) => {
    const classes = useStyles();

    function formatProvince(province) {
        switch (province) {
            case 'bavaria':
                return 'Bavaria';
            case 'lower-saxony':
                return 'Lower Saxony';
            case 'baden-wuerttemberg':
                return 'Baden Württemberg';
            case 'north-rhine-westphalia':
                return 'North Rhine-Westphalia';
            default:
                return '';
        }
    }

    const petColumns = [
        { title: 'Name', data: pet.officialName },
        { title: 'Sex', data: pet.sex },
        { title: 'Species', data: pet.species },
        { title: 'Breed', data: pet.breed },
    ];

    const userColumns = [
        { title: 'Username', data: petOwner?.username },
        { title: 'City', data: petOwner?.city },
        { title: 'Province', data: formatProvince(petOwner?.province) },
    ];

    return (
        <div className={classes.layout}>
            {step === 0 ? (
                // Infos for step 1: pet and pet owner short previews
                <Grid container direction="row" align="center" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h6">
                            Pet Information
                        </Typography>
                        <Card className={classes.root}>
                            <CardMedia className={classes.media} image={pet.profilePicture.src} title="pet profile picture" />
                            <CardContent>
                                <Table>
                                    {petColumns.map((item) => {
                                        return (
                                            <TableRow hover>
                                                <TableCell>
                                                    <Typography variant="body2" color="textPrimary" component="p">
                                                        {item.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{item.data}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h6">
                            User Information
                        </Typography>
                        <Card className={classes.root}>
                            <CardContent>
                                <Table>
                                    {userColumns.map((item) => {
                                        return (
                                            <TableRow hover>
                                                <TableCell>
                                                    <Typography variant="body2" color="textPrimary" component="p">
                                                        {item.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{item.data}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            ) : step === 1 ? (
                <Grid container direction="column" alignItems="center" justify="center" item xs={12} spacing={5}>
                    <Grid item align="center" style={{ maxWidth: 500 }}>
                        {isFreeOfCharge ? (
                            <Typography variant="body2" color="textPrimary" component="p">
                                You can directly proceed.
                            </Typography>
                        ) : (
                            <>
                                <Typography>Pay now </Typography>
                                {/* Payment with PayPal Component */}
                                <PayPalPayment amount={pet.price} onApprove={onApprove} onError={onError} />
                            </>
                        )}
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
};

export default StepperInformation;
