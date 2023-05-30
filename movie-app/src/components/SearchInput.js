import React from 'react';
import { TextField } from '@mui/material';

function SearchInput({ searchText, handleSearchTextChange }) {
    return (
        <TextField
            id="search-text"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchTextChange}
            fullWidth
            onClick={(e) => e.target.select()}
        />
    );
}

export default SearchInput;
