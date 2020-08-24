import React, { createContext, useState } from "react";

export const SearchContext = createContext("");

const SearchContextProvider = (props) => {
  const [searchEntry, setSearchEntry] = useState("");

  return (
    <SearchContext.Provider value={{ searchEntry, setSearchEntry }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
