"use client";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface SearchContextValue {
  page: number;
  changePage: (update: number) => void;
  search: string;
  changeSearch: (update: string) => void;
  movies: any[];
  changeMovies: (update: any) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

const SearchProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const changeMovies = (update: any[]) => {
    setMovies(update);
  };
  const changeSearch = (update: string) => {
    setSearch(update);
  };
  const changePage = (update: number) => {
    setPage(update);
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        changeSearch,
        page,
        changePage,
        movies,
        changeMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};

export default SearchProvider;
