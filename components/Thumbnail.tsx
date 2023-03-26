import Image from "next/image"
// Imported Types ==========>
import { Movie } from "@/typing"

interface props {
    movie: Movie
}
const Thumbnail = ({ movie }: props) => {
    return (
        <div className="relative max-h-25 h-20 min-w-[150px] cursor-pointer transition 
        duration-200 ease-out md:h-36 md:min-w-[230px] hover:opacity-75 md:hover:scale-105">
            <Image
                width={500}
                height={500}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt={movie.name || "movie-img"}
                className="rounded-md object-cover md:rounded"
                />
        </div>
    )
}

export default Thumbnail