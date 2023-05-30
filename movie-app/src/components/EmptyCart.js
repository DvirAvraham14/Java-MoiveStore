import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from "@mui/styles";



const useStyles = makeStyles((theme) => ({
    c_root: {

        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    emptyCart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));
const EmptyCart = () => {
    const classes = useStyles(); // Custom styles

    return (
        <div className={classes.emptyCart}>
            <Typography variant="h4" gutterBottom>
                You're cart is empty
            </Typography>
            <Link to="/search" className={classes.checkoutButton} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Search
                </Button>
            </Link>
        </div>
    );
}

export default EmptyCart;