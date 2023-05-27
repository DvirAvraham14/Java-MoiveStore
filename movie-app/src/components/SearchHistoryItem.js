import React from 'react';
import {MenuItem, Grid, IconButton,} from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/*
    SearchHistoryItem component is used to display the search history item.
    item: the search history item.
    onRestoreSearchItem: function to be called when the restore button is clicked.
    onRemoveSearchItem: function to be called when the remove button is clicked.
 */
function SearchHistoryItem({ item, onRestoreSearchItem, onRemoveSearchItem }) {
    return (
        <MenuItem value={item}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>{item}</Grid>
                <Grid item>
                    <IconButton size="small" onClick={() => onRestoreSearchItem(item)}>
                        <RestoreFromTrashIcon />
                    </IconButton>
                    <IconButton size="small" onClick={onRemoveSearchItem}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </MenuItem>
    );
}

export default SearchHistoryItem;
