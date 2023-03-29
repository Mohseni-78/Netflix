import React, {
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext
} from 'react'

interface props {
  children: ReactNode
}
type modalContextT = {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const modalDefaultValue: modalContextT = {
  openModal: false,
  setOpenModal: () => { }
}
const ModalContext = createContext<modalContextT>(modalDefaultValue);

export function useModal() {
  return useContext(ModalContext);
}

const ModalContextProvider = ({ children }: props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ openModal: openModal, setOpenModal: setOpenModal }}>{children}</ModalContext.Provider>
  );
}

export default ModalContextProvider