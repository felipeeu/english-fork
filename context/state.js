import { createContext, useContext } from "react";
import substages from "../.json/substages.json";

const SearchContext = createContext();

export const JsonContext = ({ children }) => {
  const state = {
    substages,
  };
  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
