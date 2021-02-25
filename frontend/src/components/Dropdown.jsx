import React, { useEffect, useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { checkDataType } from "../util/miscUtil";

// TODO: Probably needs a complete overhaul
const Dropdown = ({
  label,
  options,
  setStoreSelection,
  setDataType,
  state,
}) => {
  const handleChange = (e) => {
    const selection = e.target.value;
    setStoreSelection(selection);

    if (setDataType) {
      const { cat, subcat } = selection;
      setDataType(checkDataType(state.rtaData[cat][subcat]));
    }
  };

  const formatOption = (option) => {
    if (!setDataType) {
      return `${option[0]}${option.slice(1).toLowerCase()}`;
    }

    const { cat, subcat } = option;
    const formatWord = (word) => {
      const camelCaseSpace = word.split("").reduce((acc, curr) => {
        curr === curr.toUpperCase() ? (acc += ` ${curr}`) : (acc += curr);
        return acc;
      }, "");
      return camelCaseSpace[0].toUpperCase() + camelCaseSpace.slice(1);
    };

    return `${formatWord(cat)} - ${formatWord(subcat)}`;
  };

  return (
    <FormControl variant="outlined" className="selection-form">
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Age"
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
        onChange={handleChange}
        value={setDataType ? state.selection || "" : state.chartType}
      >
        {options.map((option, idx) => (
          <MenuItem
            value={option}
            key={`${option}-${idx}`}
            selected={idx === 0}
          >
            {formatOption(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
