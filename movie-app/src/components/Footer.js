import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

/*
    Footer component is used to display the footer on the mobile view.
 */
const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 'auto', bgcolor: 'background.paper', p: 6 }}>
            <Typography variant="h6" align="center" gutterBottom>
                <hr />
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                Copyright Dvir & Yoni Web Development
            </Typography>
        </Box>
    );
};

export default Footer;
