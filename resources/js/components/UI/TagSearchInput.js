
import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function TagSearchInput(props) {

    const [allTagData, setAllTagData] = React.useState([]);


    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      props.setSelectedTag(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    function getSelectedList(){
        return props.selectedTag;
    }

    return (
        <div>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={props.selectedTag}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.tagList.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={props.selectedTag.some((tag) => tag === name)} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
