import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

const Selection = ({ categoryTree, setCat, setSubcat, state }) => {
  const [activeCat, setActiveCat] = useState(state.selectedCat);
  const [availableSubcats, setAvailableSubcats] = useState([]);
  const categories = Object.keys(categoryTree);

  useEffect(() => {
    setActiveCat(state.selectedCat);
    // setAvailableSubcats(categoryTree[state.selectedCat]);
  }, [state.selectedCat]);

  useEffect(() => {
    if (activeCat) {
      setAvailableSubcats(categoryTree[activeCat]);
    }
  }, [activeCat, categoryTree]);
  // TODO: Need to track active
  // TODO: Only subcat selection will "change" state

  return (
    <section className="input-container">
      <Dropdown
        options={categories}
        label={"Category"}
        setStore={setCat}
        state={state}
        isCat={true}
      />
      <Dropdown
        options={availableSubcats}
        label={"Subcategory"}
        setStore={setSubcat}
        state={state}
        isCat={false}
      />
    </section>
  );
};

export default Selection;
