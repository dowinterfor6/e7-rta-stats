import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { fetchRtaData } from "./util/apiUtil.js";

ReactDOM.render(<App />, document.getElementById("root"));

window.fetchRtaData = fetchRtaData;
