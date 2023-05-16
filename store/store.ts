import { create } from "zustand";

type SearchStates = {
  page: number;
  setPage: (update: number) => void;
  allPages: number;
  setAllPages: (update: number) => void;
  search: string;
  setSearch: (update: string) => void;
};

const useSearchStates = create<SearchStates>((set) => ({
  page: 1,
  setPage: (page: number) => {
    set((state) => ({ page: page }));
  },
  allPages: 0,
  setAllPages: (page: number) => {
    set(() => ({ allPages: page }));
  },
  search: "",
  setSearch: (search: string) => {
    set(() => ({ search: search }));
  }
  
}));

export default useSearchStates;