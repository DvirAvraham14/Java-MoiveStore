import React from 'react';
import { MenuItem, Select, Grid, IconButton } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/*
    SearchHistory component is used to display the search history.
    onRestoreSearchItem: function to be called when the restore button is clicked.
    onRemoveSearchItem: function to be called when the remove button is clicked.
    onSearchHistorySelect: function to be called when the search history is selected.
    closeSelect: function to be called when the search history is closed.
 */
function SearchHistory({searchHistory, onRestoreSearchItem, onRemoveSearchItem,
                           onSearchHistorySelect, closeSelect}) {
    return (
        <Select
            value=""
            onChange={onSearchHistorySelect}
            fullWidth
            onClose={closeSelect}
            onOpen={() => {}}
        >
            {searchHistory.map((item, index) => (
                <MenuItem key={index} value={item}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>{item}</Grid>
                        <Grid item>
                            <IconButton
                                size="small"
                                onClick={() => onRestoreSearchItem(item)}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => onRemoveSearchItem(index)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </MenuItem>
            ))}
        </Select>
    );
}

export default SearchHistory;
