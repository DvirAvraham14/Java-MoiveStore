import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";

/*
    Home component is used to display the home page on the mobile view.
    It is used in the App component.
 */
const Home = () => {

    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 4 }}
                >
                    Welcome to our IMDb Web Store!
                </Typography>
                <Typography variant="h6" align="center" paragraph sx={{ mb: 6 }}>
                    Discover a vast collection of movies, TV shows, and documentaries from various genres and creators.
                    Find popular titles and hidden gems that will captivate your imagination.
                </Typography>
                <Typography variant="body1" align="center" sx={{ fontStyle: 'italic' }}>
                    "Movies can be a powerful medium to inspire, entertain, and broaden our perspectives.
                    Explore our website and embark on a cinematic journey like no other."
                </Typography>
            </Container>
        </Box>
    );
}

export default Home;
