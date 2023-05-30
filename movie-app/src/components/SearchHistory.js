import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Select, MenuItem, Grid, IconButton } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { HistoryContext } from './MovieShoping';


function SearchHistory({ searchText, handleSearchHistorySelect, handleRestoreSearchItem, handleRemoveSearchItem }) {

    const history = useContext(HistoryContext);

    return (
        <>
            {history.history.length > 0 && (
                <Select
                    value={searchText}
                    onChange={handleSearchHistorySelect}
                    fullWidth
                >
                    {history.history.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item>{item}</Grid>
                                <Grid item>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRestoreSearchItem(item)}
                                    >
                                        <RestoreFromTrashIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveSearchItem(index)}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    ))}
                </Select>
            )}
        </>
    );
}

export default SearchHistory;
