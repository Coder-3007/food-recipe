import React, { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favouritesList, setFavouritesList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavourite(getCurrentItem) {
    console.log(getCurrentItem);
    let copyFavouritesList = [...favouritesList];
    const index = copyFavouritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      copyFavouritesList.push(getCurrentItem);
    } else {
      copyFavouritesList.splice(index);
    }
    setFavouritesList(copyFavouritesList);
  }

  console.log(loading, recipeList);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        recipeDetailsData,
        setRecipeDetailsData,
        handleSubmit,
        handleAddToFavourite,
        favouritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
