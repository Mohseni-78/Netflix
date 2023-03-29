import React, {
    ReactNode,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState
} from 'react'

interface props {
    children: ReactNode
}

type likeStateT = {
    like: number[] | []
    setLike: Dispatch<SetStateAction<any>>
}
const defaultValueContext: likeStateT = {
    like: [],
    setLike: () => { }
}

const LikeContext = createContext<likeStateT>(defaultValueContext);

export function useLike() {
    return useContext(LikeContext);
}

const LikedContextProvider = ({ children }: props) => {
    const [like, setLike] = useState<number[] | []>([])
    const value = {
        like: like, setLike: setLike
    }
    return (
        <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    )
}

export default LikedContextProvider