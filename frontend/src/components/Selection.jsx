import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "../styles/selection.scss";
import {
  BAR_CHART,
  checkDataType,
  PIE_CHART,
  TREEMAP_CHART,
} from "../util/miscUtil";

const Selection = ({
  setStoreSelection,
  categoryTree,
  setDataType,
  setChartType,
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

  return (
    <section className="input-container">
      <Dropdown
        options={categories}
        label={"Data"}
        setStoreSelection={setStoreSelection}
        setDataType={setDataType}
        state={state}
      />
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
