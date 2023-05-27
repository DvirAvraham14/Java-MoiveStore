import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/*
    useSnackbar hook is used to display the snackbar.
 */
function useSnackbar() {
    const [isOpen, setIsOpen] = useState(false); // isOpen is used to control the visibility of the snackbar.
    const [severity, setSeverity] = useState('success'); // severity is used to control the severity of the snackbar.
    const [message, setMessage] = useState(''); // message is used to control the message of the snackbar.

    // openSnackbar function is used to open the snackbar.
    const openSnackbar = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setIsOpen(true);
    };

    // closeSnackbar function is used to close the snackbar.
    const closeSnackbar = () => {
        setIsOpen(false);
    };

    // SnackbarComponent is the snackbar component.
    const SnackbarComponent = () => (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={closeSnackbar}>
            <MuiAlert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );

    return { openSnackbar, closeSnackbar, SnackbarComponent };
}

export default useSnackbar;
