import Image from "next/image"
// Imported Types ==========>
import { Movie } from "@/typing"
// Imported Contexts ==========>
import { useModal } from '@/contexts/ModalContextProvider'
import { useMovie } from '@/contexts/MovieContextProvider'

interface props {
    movieProps: Movie
}
const Thumbnail = ({ movieProps }: props) => {
    const { setOpenModal } = useModal();
    const { setMovie } = useMovie();

    return (
        <div
            onClick={() => {
                setMovie(movieProps)
                setOpenModal(true);
            }
            }
            className="relative max-h-25 h-20 min-w-[150px] cursor-pointer transition 
        duration-200 ease-out md:h-36 md:min-w-[230px] hover:opacity-75 md:hover:scale-105">
            <Image
                width={500}
                height={500}
                src={`https://image.tmdb.org/t/p/w500${movieProps.backdrop_path || movieProps.poster_path}`}
                alt={movieProps.name || "movie-img"}
                className="rounded-md object-cover md:rounded"
            />
        </div>
    )
}

export default Thumbnail