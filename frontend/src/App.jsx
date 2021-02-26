import React, { useEffect, useReducer, useState } from "react";
import Selection from "./components/Selection";
import Nav from "./components/Nav";
import "./styles/app.scss";
import { fetchRtaData } from "./util/apiUtil";
import ChartContainer from "./components/ChartContainer";
import { BAR_CHART } from "./util/miscUtil";

const App = () => {
  const SET_SELECTION = "SETSELECTION";
  const SET_DATA_TYPE = "SETDATATYPE";
  const SET_RTA_DATA = "SETRTADATA";
  const SET_CHART_TYPE = "SETCHARTTYPE";
  const SET_FILTER = "SETFILTER";

  const reducer = (state, { type, payload }) => {
    let nextState = Object.assign({}, state);

    switch (type) {
      // TODO: Could probably refactor this
      case SET_SELECTION:
        nextState.selection = payload;
        nextState.filter = "";
        return nextState;
      case SET_DATA_TYPE:
        nextState.dataType = payload;
        return nextState;
      case SET_RTA_DATA:
        nextState.rtaData = payload;
        return nextState;
      case SET_CHART_TYPE:
        nextState.chartType = payload;
        return nextState;
      case SET_FILTER:
        nextState.filter = payload;
        return nextState;
      default:
        return state;
    }
  };

  const setStoreSelection = (selection) =>
    dispatch({
      type: SET_SELECTION,
      payload: selection,
    });

  const setChartType = (type) =>
    dispatch({
      type: SET_CHART_TYPE,
      payload: type,
    });

  const setDataType = (dataType) =>
    dispatch({
      type: SET_DATA_TYPE,
      payload: dataType,
    });

  const setRtaData = (rtaData) =>
    dispatch({
      type: SET_RTA_DATA,
      payload: rtaData,
    });

  const setFilter = (filter) =>
    dispatch({
      type: SET_FILTER,
      payload: filter,
    });

  const initialState = {
    rtaData: {},
    chartType: BAR_CHART,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [categoryTree, setCategoryTree] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchRtaData();
      setRtaData(data);

      const catTree = {};
      for (const [cat, val] of Object.entries(data)) {
        catTree[cat] = Object.keys(val);
      }
      setCategoryTree(catTree);
    };

    fetchData();
  }, []);

  console.log("state: ", state);

  return (
    <div className="App">
      <Nav />
      <Selection
        setStoreSelection={setStoreSelection}
        setDataType={setDataType}
        setChartType={setChartType}
        setFilter={setFilter}
        categoryTree={categoryTree}
        state={state}
      />
      <ChartContainer state={state} />
    </div>
  );
};

export default App;
