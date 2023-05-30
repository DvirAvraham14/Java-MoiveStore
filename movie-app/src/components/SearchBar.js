// import React, {useContext, useState} from 'react';
// import { makeStyles } from '@mui/styles';
// import {TextField, Button, FormControlLabel, Checkbox, Collapse, Grid,
//     MenuItem, Select, IconButton} from '@mui/material';
// import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import useFetch from '../hooks/useFetch';
// import MultiSelect from './MultiSelect';
// import {HistoryContext} from "./MovieShoping";
//
// const useStyles = makeStyles(() => ({
//     s_root: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         '& > *': {
//             width: '25ch',
//         },
//     },
//     TextField: {
//         width: '100%',
//     },
// }));
//
// const API_KEY = process.env.REACT_APP_RMDB_KEY;
//
// /*
//     SearchBar component is used to display the search bar.
//     it uses the MultiSelect component.
//     onSearch: function to be called when the search button is clicked.
//  */
// function SearchBar({ onSearch }) {
//     const history = useContext(HistoryContext);
//     const classes = useStyles(); // Custom styles
//     const [searchText, setSearchText] = useState(''); // State to store the search text
//     const [selectedGenres, setSelectedGenres] = useState([]); // State to store the selected genres
//     const [selectedPubDate, setSelectedPubDate] = useState(''); // State to store the selected publish date
//     const [advancedMode, setAdvancedMode] = useState(false); // State to store the advanced mode
//
//     // Function to handle the change in the search text
//     const handleSearchTextChange = (event) => {
//         setSearchText(event.target.value);
//     };
//
//     // Function to handle the change in the selected genres
//     const handleGenreChange = (values) => {
//         setSelectedGenres(values);
//     };
//     // Function to handle the change in the selected publish date
//     const handlePubDateChange = (event) => {
//         setSelectedPubDate(event.target.value);
//     };
//     // Function to handle the change in the advanced mode
//     const handleAdvancedModeChange = (event) => {
//         setAdvancedMode(event.target.checked);
//     };
//     // Function to handle the search
//     const handleSearchHistorySelect = (event) => {
//         setSearchText(event.target.value);
//     };
//     // Function to handle the search
//     const handleSearch = (event) => {
//         event.preventDefault();
//         const genreIds = response.genres
//             .filter((genre) => selectedGenres.includes(genre.name))
//             .map((genre) => genre.id);
//
//         onSearch(searchText, genreIds, selectedPubDate);
//
//         if (!history.history.includes(searchText) && searchText !== '') {
//             history.setHistory((prevHistory) => [...prevHistory, searchText]);
//         }
//         setSearchText('');
//     };
//     // Function to handle the restore search item
//     const handleRestoreSearchItem = (item) => {
//         setSearchText(item);
//     };
//
//     // Function to handle the remove search item
//     const handleRemoveSearchItem = (index) => {
//         history.setHistory((prevHistory) =>
//             prevHistory.filter((_, i) => i !== index)
//         );
//     };
//     // Function to handle the clear search history
//     const { response, error, isLoading } = useFetch(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
//     );
//
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//
//     return (
//         <form noValidate autoComplete="on" onSubmit={handleSearch}>
//             <Grid container spacing={1} className={classes.s_root}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="search-text"
//                         label="Search"
//                         variant="outlined"
//                         value={searchText}
//                         onChange={handleSearchTextChange}
//                         fullWidth
//                         onClick={(e) => e.target.select()}
//                     />
//                     {history.history.length > 0 && (
//                         <Select
//                             value={searchText}
//                             onChange={handleSearchHistorySelect}
//                             fullWidth
//
//                         >
//                             {history.history.map((item, index) => (
//                                 <MenuItem key={index} value={item}>
//                                     <Grid
//                                         container
//                                         alignItems="center"
//                                         justifyContent="space-between"
//                                     >
//                                         <Grid item>{item}</Grid>
//                                         <Grid item>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => handleRestoreSearchItem(item)}
//                                             >
//                                                 <RestoreFromTrashIcon />
//                                             </IconButton>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => handleRemoveSearchItem(index)}
//                                             >
//                                                 <DeleteForeverIcon />
//                                             </IconButton>
//                                         </Grid>
//                                     </Grid>
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     )}
//                 </Grid>
//
//                 <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     container
//                     spacing={1}
//                     sx={{ order: 2 }}
//                     className={classes.s_root}
//                 >
//                     <Grid item>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={advancedMode}
//                                     onChange={handleAdvancedModeChange}
//                                 />
//                             }
//                             label="Discover Mode"
//                         />
//                     </Grid>
//                     <Grid item sx={{ order: 1 }} className={classes.s_root}>
//                         <Button variant="contained" color="primary" type="submit">
//                             Search
//                         </Button>
//                     </Grid>
//                 </Grid>
//
//                 <Grid item xs={12}>
//                     <Collapse in={advancedMode}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} md={6}>
//                                 <MultiSelect
//                                     id="genre-select"
//                                     options={response ? response.genres : []}
//                                     label="Genres"
//                                     value={selectedGenres}
//                                     onChange={handleGenreChange}
//                                     className={classes.TextField}
//                                 />
//                             </Grid>
//
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     id="pubdate-input"
//                                     label="Publication Date"
//                                     type="date"
//                                     variant="outlined"
//                                     value={selectedPubDate}
//                                     onChange={handlePubDateChange}
//                                     InputLabelProps={{
//                                         shrink: true,
//                                     }}
//                                     fullWidth
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Collapse>
//                 </Grid>
//             </Grid>
//         </form>
//     );
// }
//
// export default SearchBar;



import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {Button, FormControlLabel, Checkbox, Collapse, Grid, TextField} from '@mui/material';
import useFetch from '../hooks/useFetch';
import MultiSelect from './MultiSelect';
import { HistoryContext } from './MovieShoping';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';

const useStyles = makeStyles(() => ({
    s_root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            width: '25ch',
        },
    },
}));

const API_KEY = process.env.REACT_APP_RMDB_KEY;

function SearchBar({ onSearch }) {
    const history = useContext(HistoryContext);
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

    const handleSearchHistorySelect = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchText, selectedGenres, selectedPubDate);

        if (!history.history.includes(searchText) && searchText !== '') {
            history.setHistory((prevHistory) => [...prevHistory, searchText]);
        }
        setSearchText('');
    };

    const handleRestoreSearchItem = (item) => {
        setSearchText(item);
    };

    const handleRemoveSearchItem = (index) => {
        history.setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
    };

    const { response, error, isLoading } = useFetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <form noValidate autoComplete="on" onSubmit={handleSearch}>
            <Grid container spacing={1} className={classes.s_root}>
                <Grid item xs={12} sm={6}>
                    <SearchInput searchText={searchText} handleSearchTextChange={handleSearchTextChange} />
                    <SearchHistory
                        searchText={searchText}
                        handleSearchHistorySelect={handleSearchHistorySelect}
                        handleRestoreSearchItem={handleRestoreSearchItem}
                        handleRemoveSearchItem={handleRemoveSearchItem}
                    />
                </Grid>

                <Grid item xs={12} sm={6} container spacing={1} sx={{ order: 2 }} className={classes.s_root}>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={advancedMode} onChange={handleAdvancedModeChange} />}
                            label="Discover Mode"
                        />
                    </Grid>
                    <Grid item sx={{ order: 1 }} className={classes.s_root}>
                        <Button variant="contained" color="primary" type="submit">
                            Search
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
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
