import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Collapse,
    Grid,
} from '@mui/material';

import useFetch from '../hooks/useFetch';
import MultiSelect from './MultiSelect';

const useStyles = makeStyles((theme) => ({
    s_root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            width: '25ch',
        },
    },

    TextField: {
        width: '100%',
    }

}));

const API_KEY = process.env.REACT_APP_RMDB_KEY;

function SearchBar({ onSearch }) {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPubDate, setSelectedPubDate] = useState('');
    const [advancedMode, setAdvancedMode] = useState(false);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleGenreChange = (values) => {
        setSelectedGenres(values);
    };

    const handlePubDateChange = (event) => {
        setSelectedPubDate(event.target.value);
    };

    const handleAdvancedModeChange = (event) => {
        setAdvancedMode(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const genreIds = response.genres
            .filter((genre) => selectedGenres.includes(genre.name))
            .map((genre) => genre.id);

        onSearch(searchText, genreIds, selectedPubDate);
    };

    const { response, error, isLoading } = useFetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    return (
        <form
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2} className={classes.s_root}>
                <Grid item xs={12} sm={6} >
                    <TextField
                        id="search-text"
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={handleSearchTextChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} container spacing={2} sx={{order: 2}} className={classes.s_root}>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={advancedMode}
                                    onChange={handleAdvancedModeChange}
                                />
                            }
                            label="Discover Mode"
                        />
                    </Grid>
                    <Grid item sx={{order: 1}} className={classes.s_root}>
                        <Button variant="contained" color="primary" type="submit">
                            Search
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} >
                    <Collapse in={advancedMode}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <MultiSelect
                                    id="genre-select"
                                    options={response ? response.genres : []}
                                    label="Genres"
                                    value={selectedGenres}
                                    onChange={handleGenreChange}
                                    className={classes.TextField}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="pubdate-input"
                                    label="Publication Date"
                                    type="date"
                                    variant="outlined"
                                    value={selectedPubDate}
                                    onChange={handlePubDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchBar;


// /*
// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@mui/styles';
// import {
//     TextField,
//     Button,
// } from '@mui/material';
//
// import useFetch from '../hooks/useFetch';
// import MultiSelect from './MultiSelect';
//
// const useStyles = makeStyles((theme) => ({
//     s_root: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: theme.spacing(1),
//         '& > *': {
//             width: '25ch',
//         },
//     },
//     formControl: {
//         margin: theme.spacing(2),
//         minWidth: 120,
//     },
// }));
//
// const API_KEY = process.env.REACT_APP_RMDB_KEY;
//
// function SearchBar({ onSearch }) {
//     const classes = useStyles();
//     const [searchText, setSearchText] = useState('');
//     const [selectedGenres, setSelectedGenres] = useState([]);
//     const [selectedPubDate, setSelectedPubDate] = useState('');
//
//     const handleSearchTextChange = (event) => {
//         setSearchText(event.target.value);
//     };
//
//     const handleGenreChange = ( values) => {
//         setSelectedGenres(values);
//     };
//
//     const handlePubDateChange = (event) => {
//         setSelectedPubDate(event.target.value);
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const genreIds = response.genres.filter(function(genre) {
//             return selectedGenres.includes(genre.name);
//         }).map(function(genre) {
//             return genre.id;
//         });
//
//         onSearch(searchText, genreIds, selectedPubDate);
//     };
//
//
//     const { response, error, isLoading } = useFetch(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
//     );
//
//     return (
//         <form
//             className={classes.s_root}
//             noValidate
//             autoComplete="on"
//             onSubmit={handleSubmit}
//         >
//             <TextField
//                 id="search-text"
//                 label="Search"
//                 variant="outlined"
//                 value={searchText}
//                 onChange={handleSearchTextChange}
//             />
//
//             <MultiSelect
//                 id="genre-select"
//                 options={response ? response["genres"] : []}
//                 label="Genres"
//                 value={selectedGenres}
//                 onChange={handleGenreChange}
//             />
//
//             <TextField
//                 id="pubdate-input"
//                 label="Publication Date"
//                 type="date"
//                 variant="outlined"
//                 className={classes.formControl}
//                 value={selectedPubDate}
//                 onChange={handlePubDateChange}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//             />
//
//             <Button variant="contained" color="primary" type="submit">
//                 Search
//             </Button>
//         </form>
//     );
// }
//
// export default SearchBar;
// */
