import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import "./styles/app.scss";
import { fetchRtaData } from "./util/apiUtil";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

const App = () => {
  const [rtaData, setRtaData] = useState({});
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchRtaData();
      setRtaData(data);
    };

    fetchData();
    // TODO: Build input tree (or whatever it is)
    // to determine what inputs can be selected
  }, []);

  // TODO: Loading screen or something for rtaData = {};
  if (rtaData) {
    console.log(Object.keys(rtaData));
    console.log(rtaData);
  }

  return (
    <div className="App">
      <Nav />
      <section className="input-container">
        <FormControl variant="outlined" className="selection-form">
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
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
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="selection-form">
          <InputLabel id="demo-simple-select-outlined-label">
            dsgdsag
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="dsgdsag"
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Tendsaf</MenuItem>
            <MenuItem value={20}>Twentadsfy</MenuItem>
            <MenuItem value={30}>Thirtdsafy</MenuItem>
          </Select>
        </FormControl>
      </section>
    </div>
  );
};

export default App;
