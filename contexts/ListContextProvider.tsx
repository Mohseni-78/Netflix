import React, {
  ReactNode,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
// Imported Types ============>
import { Movie } from "@/typing";

interface props {
  children: ReactNode;
}
type ListContextT = {
  list: Movie[] | [];
  setList: Dispatch<SetStateAction<Movie | null>>;
};
const ListDefaultValue = {
  list: [],
  setList: () => {},
};

const listContext = createContext<ListContextT>(ListDefaultValue);

export function useList() {
  return useContext(listContext);
}
const ListContextProvider = ({ children }: props) => {
  const [list, setList] = useState<Movie[] | []>([]);
  const value = {
    list: list,
    setList: setList,
  };
  return (
    <listContext.Provider value={value}>{children}</listContext.Provider>
  )
};

export default ListContextProvider;
