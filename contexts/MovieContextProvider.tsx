import React, {
    ReactNode,
    useState,
    useContext,
    createContext,
    Dispatch,
    SetStateAction
} from 'react'
// Imported Types ============>
import { Movie } from '@/typing'

interface props {
    children: ReactNode
}
type movieContextT = {
    movie: Movie | null,
    setMovie: Dispatch<SetStateAction<Movie | null>>
}
const MovieDefaultValue = {
    movie: null,
    setMovie: () => { }
}

const MovieContext = createContext<movieContextT>(MovieDefaultValue);

export function useMovie() {
    return useContext(MovieContext);
}
const MovieContextProvider = ({ children }: props) => {
    const [movie, setMovie] = useState<Movie | null>(null)
    return (
        <MovieContext.Provider value={{ movie: movie, setMovie: setMovie }}>{children}</MovieContext.Provider>
    )
}

export default MovieContextProvider