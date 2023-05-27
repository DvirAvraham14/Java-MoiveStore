import React from 'react';
import {makeStyles} from '@mui/styles';
import { Button, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    n_root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
    },
    message: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
}));

/*
    PageNotFound component is used to display the 404 page not found page.
 */
const PageNotFound = () => {
    const classes = useStyles();

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className={classes.n_root}>
            <Typography variant="h4" className={classes.message}>
                404 Page Not Found
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoBack}>
                Go Back
            </Button>
        </div>
    );
};

export default PageNotFound;
