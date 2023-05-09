import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Footer = () => {

    return (
        <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
            <hr />
        </Typography>
        <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
        >
            Copyright Dvir&Yoni Web Development
        </Typography>
    </Box>
    );
};

export default Footer;