import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip } from '@mui/material';

const MultiSelect = ({ value, onChange, options, label }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl variant="outlined">
            <InputLabel id="multi-select-label">{label}</InputLabel>
            <Select
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={value}
                onChange={handleChange}
                renderValue={(selected) => (
                    <div>
                        {selected?.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </div>
                )}
            >
                { options?.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        <Checkbox checked={value.includes(option.name)} />
                        <ListItemText primary={option.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;
