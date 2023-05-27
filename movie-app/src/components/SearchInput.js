import React from 'react';
import { TextField } from '@mui/material';

/*
    SearchInput component is used to display the search input.
    value: the value of the search input.
    onChange: function to be called when the value of the search input changes.
    onClick: function to be called when the search input is clicked.
 */
function SearchInput({ value, onChange, onClick }) {
    return (
        <TextField
            id="search-text"
            label="Search"
            variant="outlined"
            value={value}
            onChange={onChange}
            fullWidth
            onClick={onClick}
        />
    );
}

export default SearchInput;
