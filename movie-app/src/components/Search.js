import React from 'react';
import Cards from "./Cards";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from '@mui/styles';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    s_root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        '& > *': {
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const genres = [
    {
        value: 'action',
        label: 'Action',
    },
    {
        value: 'comedy',
        label: 'Comedy',
    },
    {
        value: 'drama',
        label: 'Drama',
    },
];



function SearchBar() {
    const classes = useStyles();
    const [searchText, setSearchText] = React.useState('');
    const [selectedGenre, setSelectedGenre] = React.useState('');
    const [selectedPubDate, setSelectedPubDate] = React.useState('');

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handlePubDateChange = (event) => {
        setSelectedPubDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Search Text: ${searchText}, Genre: ${selectedGenre}, Publication Date: ${selectedPubDate}`);
        // call API or perform search
    };
    return (
        <form className={classes.s_root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="search-text" label="Search" variant="outlined" value={searchText} onChange={handleSearchTextChange} />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select labelId="genre-select-label" id="genre-select" value={selectedGenre} onChange={handleGenreChange} label="Genre">
                    {genres.map((genre) => (
                        <MenuItem key={genre.value} value={genre.value}>
                            {genre.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="pubdate-input"
                label="Publication Date"
                type="date"
                variant="outlined"
                className={classes.formControl}
                value={selectedPubDate}
                onChange={handlePubDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Button variant="contained" color="primary" type="submit">
                Search
            </Button>
        </form>
    );
}


/**
 * This component is used to display the header
 * @returns {JSX.Element}
 * @constructor
 */
const Search = () => {
    return (
        <>

                <SearchBar />
                <Grid container spacing={4}>
                    <Cards />
                </Grid>
        </>
    );
}

export default Search;
