/* eslint-disable @next/next/no-img-element */

import { BASE_IMAGE_URL } from "@/constants/movie"
import { Movie } from "@/typing"
import Image from "next/image"
import { useEffect, useState } from "react"

interface props {
  netflixOriginals: Movie[]
}
const Banner = ({ netflixOriginals }: props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [])
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 md:h-[75vh] justify-center lg:pb-12">
      <Image className=" absolute -z-10 h-[85vh]  w-screen object-cover"
        width={2000} height={2000}
        src={`${BASE_IMAGE_URL}/${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.name || "banner-name"} />
      <h1 className="ml-2 md:ml-4 text-2xl font-bold md:text-3xl lg:text-5xl">{movie?.name || movie?.title || movie?.original_name}</h1>
      <p className="ml-2 md:ml-4 max-w-xs text-xs  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl leading-5">{movie?.overview}</p>
      <div className="flex gap-2 ml-2 md:ml-4">
        <button className="bannerBtn">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor"
            className="w-4 h-4 mr-1 md:w-6 md:h-6 ">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>

          Play</button>
        <button className="bannerBtn">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor"
            className="w-4 h-4 mr-1 md:w-6 md:h-6 ">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>

          More Info...</button>
      </div>
    </div>
  )
}

export default Banner

