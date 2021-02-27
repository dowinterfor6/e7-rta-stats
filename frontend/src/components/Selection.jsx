import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

import {
  BAR_CHART,
  checkDataType,
  OBJ_MULTI_SELECT,
  PIE_CHART,
  TREEMAP_CHART,
} from "../util/miscUtil";

const Selection = ({
  setStoreSelection,
  categoryTree,
  setDataType,
  setChartType,
  setFilter,
  state,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const formattedCategory = [];
    for (const [category, values] of Object.entries(categoryTree)) {
      formattedCategory.push(
        ...values.reduce((acc, curr) => {
          if (curr === "numBattles") return acc;
          acc.push({ cat: category, subcat: curr });
          return acc;
        }, [])
      );
    }

    const defaultCat = formattedCategory[0];
    setCategories(formattedCategory);
    if (defaultCat) {
      const { cat, subcat } = defaultCat;
      setStoreSelection(defaultCat);
      setDataType(checkDataType(state.rtaData[cat][subcat]));
    }
  }, [categoryTree]);

  let filterOptions = [];
  let filterDropdown;

  if (state.dataType === OBJ_MULTI_SELECT) {
    const { rtaData, selection } = state;
    const { cat, subcat } = selection;

    filterOptions = Object.keys(rtaData[cat][subcat]);
    filterDropdown = (
      <Dropdown
        options={filterOptions}
        label={"Filter"}
        setStoreSelection={setFilter}
        state={state}
      />
    );
  }

  return (
    <section className="input-container">
      <Dropdown
        options={categories}
        label={"Data"}
        setStoreSelection={setStoreSelection}
        setDataType={setDataType}
        setFilter={setFilter}
        state={state}
      />
      {filterDropdown}
      <Dropdown
        options={[BAR_CHART, PIE_CHART, TREEMAP_CHART]}
        label={"Chart Type"}
        setStoreSelection={setChartType}
        state={state}
      />
    </section>
  );
};

export default Selection;
