import React, { useEffect, useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

const Dropdown = ({ label, options, setStore, state, isCat }) => {
  const [selected, setSelected] = useState();

  const handleChange = (e) => {
    const selection = e.target.value;
    setSelected(selection);
    setStore(selection);
  };

  useEffect(() => {
    if (!isCat) {
      setSelected(options.length > 0 ? options[0] : "");
      setStore(options.length > 0 ? options[0] : "");
    } else {
      setSelected(state.selectedCat);
    }
  }, [state.selectedCat, options]);

  const formatOption = (option) => {
    const camelCaseSpace = option.split("").reduce((acc, curr) => {
      curr === curr.toUpperCase() ? (acc += ` ${curr}`) : (acc += curr);
      return acc;
    }, "");
    return camelCaseSpace[0].toUpperCase() + camelCaseSpace.slice(1);
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
        value={selected || ""}
      >
        {options.map((option, idx) => (
          <MenuItem value={option} key={`${option}-${idx}`}>
            {formatOption(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
