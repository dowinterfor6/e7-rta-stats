import React from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import {
  checkDataType,
  formatServerName,
  OBJ_MULTI_SELECT,
} from "../util/miscUtil";

/*
  TODO: Potentially refactor to using type consts instead of label
        to differentiate between dropdown types. A better way 
        would be to use a wrapper component to handle this logic
        so Dropdown.jsx will only contain the dropdown itself
*/
const Dropdown = ({
  label,
  options,
  setStoreSelection,
  setDataType,
  setFilter,
  state,
}) => {
  const handleChange = (e) => {
    const selection = e.target.value;
    setStoreSelection(selection);

    if (setDataType) {
      const { cat, subcat } = selection;
      const nextData = state.rtaData[cat][subcat];
      const dataType = checkDataType(nextData);
      setDataType(dataType);
      if (dataType === OBJ_MULTI_SELECT) {
        setFilter(Object.keys(nextData)[0]);
      }
    }
  };

  const formatOption = (option) => {
    if (!setDataType) {
      if (label === "Filter") {
        return formatServerName(option);
      }
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

  const valueBinding = () => {
    if (setDataType) {
      return state.selection || "";
    } else if (label === "Filter") {
      return state.filter || "";
    } else {
      return state.chartType;
    }
  };

  return (
    <FormControl
      variant="outlined"
      className={`selection-form ${label.replace(" ", "-").toLowerCase()}`}
      size={`${document.body.clientWidth < 900 ? "small" : "medium"}`}
    >
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
        value={valueBinding()}
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
