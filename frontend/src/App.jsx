import React, { useEffect, useReducer, useState } from "react";
import Selection from "./components/Selection";
import Nav from "./components/Nav";
import "./styles/app.scss";
import { fetchRtaData } from "./util/apiUtil";
import ChartContainer from "./components/ChartContainer";

const App = () => {
  const SET_CAT = "SETCAT";
  const SET_SUBCAT = "SETSUBCAT";

  const reducer = (state, { type, payload }) => {
    let nextState = Object.assign({}, state);

    switch (type) {
      case SET_CAT:
        nextState.selectedCat = payload;
        return nextState;
      case SET_SUBCAT:
        nextState.selectedSubcat = payload;
        return nextState;
      default:
        return state;
    }
  };

  const initialState = {
    selectedCat: "",
    selectedSubcat: "",
  };

  const setCat = (cat) =>
    dispatch({
      type: SET_CAT,
      payload: cat,
    });

  const setSubcat = (subcat) =>
    dispatch({
      type: SET_SUBCAT,
      payload: subcat,
    });

  const [state, dispatch] = useReducer(reducer, initialState);

  const [rtaData, setRtaData] = useState({});
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
      setCat(Object.keys(catTree)[0]);
      setSubcat(catTree[Object.keys(catTree)[0]][0]);
    };

    fetchData();
  }, []);

  // TODO: Handle submit for Selection

  // TODO: Loading screen or something for rtaData = {};
  if (rtaData) {
    // console.log(Object.keys(rtaData));
    // console.log(rtaData);
  }

  console.log("state: ", state);

  return (
    <div className="App">
      <Nav />
      <Selection
        categoryTree={categoryTree}
        setCat={setCat}
        setSubcat={setSubcat}
        state={state}
      />
      <ChartContainer state={state} rtaData={rtaData} />
    </div>
  );
};

export default App;
