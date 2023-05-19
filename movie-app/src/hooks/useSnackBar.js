import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function useSnackbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const openSnackbar = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setIsOpen(true);
    };

    const closeSnackbar = () => {
        setIsOpen(false);
    };

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
