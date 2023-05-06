"use client";
import axios from "axios";
import {
  createContext,
  FormEvent,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface SearchContextValue {
  page: number;
  changePage: (update: number) => void;
  allPages: number;
  changeAllPages: (update: number) => void;
  search: string;
  changeSearch: (update: string) => void;
  movies: any[];
  changeMovies: (update: any) => void;
  handleSearch: <async>(page: number) => void;
  handleSubmit: <async>(e: FormEvent, page: number) => void;
  loadingSearch: boolean;
  changeLoadingSearch: (update: boolean) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

const SearchProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [allPages, setAllPages] = useState<number>(0)
  const changeLoadingSearch = (update: boolean) =>{
    setLoadingSearch(update);
  }
  const changeMovies = (update: any[]) => {
    setMovies(update);
  };
  const changeAllPages = (update: number) => {
    setAllPages(update);
  };
  const changeSearch = (update: string) => {
    setSearch(update);
  };
  const changePage = (update: number) => {
    setPage(update);
  };

  const handleSearch = async (page: number) => {
    setLoadingSearch(true);
    await axios
      .post("api/search", {
        search: search,
        page: page,
      })
      .then((res) => {
        const { data, moviesCount } = res.data;
        setAllPages(Math.floor(moviesCount / 20));
        changeMovies(data);
      })
      .finally(() => {
        setLoadingSearch(false);
      });
  };

  const handleSubmit = (e: FormEvent, page: number) => {
    e.preventDefault();
    changePage(page);
    if (search) {
      handleSearch(page);
    } else {
      alert("escolha um genero");
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        changeSearch,
        allPages,
        changeAllPages,
        page,
        changePage,
        movies,
        changeMovies,
        loadingSearch,
        changeLoadingSearch,
        handleSearch,
        handleSubmit
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
