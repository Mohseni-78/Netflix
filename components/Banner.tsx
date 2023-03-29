
import Image from "next/image"
import { useEffect, useState } from "react"
// Imported Constants =========>
import { BASE_IMAGE_URL } from "@/constants/movie"
// Imported Types =========>
import { Movie } from "@/typing"
// Imported Context =========>
import { useModal } from "@/contexts/ModalContextProvider"
import { useMovie } from "@/contexts/MovieContextProvider"
// Imported Icons ==========>
import { BsFillPlayFill } from 'react-icons/bs'
import { HiInformationCircle } from 'react-icons/hi'


interface props {
  netflixOriginals: Movie[]
}
const Banner = ({ netflixOriginals }: props) => {
  const { setMovie } = useMovie();
  const { setOpenModal } = useModal();
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setCurrentMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 md:h-[75vh] justify-center lg:pb-12">
      <Image className=" absolute -z-10 h-[85vh]  w-screen object-cover"
        width={2000} height={2000}
        src={`${BASE_IMAGE_URL}/${currentMovie?.backdrop_path || currentMovie?.poster_path}`}
        alt={currentMovie?.name || "banner-name"} />
      <h1 className="ml-2 md:ml-4 text-2xl font-bold md:text-3xl lg:text-5xl">
        {currentMovie?.name || currentMovie?.title || currentMovie?.original_name}
      </h1>
      <p className="ml-2 md:ml-4 max-w-xs text-xs  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl leading-5">
        {currentMovie?.overview}
      </p>
      <div className="flex gap-2 ml-2 md:ml-4">
        <button className="bannerBtn">
          <BsFillPlayFill className="w-4 h-4 mr-1 md:w-6 md:h-6" />
          Play
        </button>
        <button
          onClick={() => {
            setMovie(currentMovie);
            setOpenModal(true);
          }}
          className="bannerBtn">
          <HiInformationCircle className="w-4 h-4 mr-1 md:w-6 md:h-6 " />
          More Info...
        </button>
      </div>
    </div>
  )
}

export default Banner

