import { useRef, useState } from 'react'
// Imported Types ==========>
import { Movie } from '@/typing'
// Imported Components ==========>
import Thumbnail from './Thumbnail'
// Imported Icons ==========>
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'


interface props {
    title: string,
    movies: Movie[]
}

const Row = ({ title, movies }: props) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState<boolean>(false)



    const handleClick = (direction: string) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }
    return (
        <div className='h-40 px-10 md:mt-7 '>
            <div className="group relative md:-ml-1">
                <h2 className={`w-56 cursor-pointer text-sm font-semibold
                 text-[#e5e5e5] transition duration-200 hover:text-white
                  md:text-xl md:ml-3 ml-1 ${title === "My List" && "text-red-500"}`}>
                    {title}
                </h2>
                <FiArrowLeft
                    onClick={() => handleClick('left')}
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 
                    w-9 cursor-pointer opacity-0 transition hover:scale-125 
                    group-hover:opacity-100 ${!isMoved && 'hidden'}`} />

                <div
                    className="flex items-center space-x-4 overflow-x-scroll 
                    overflow-y-hidden scrollbar-hide md:space-x-2.5 md:p-2 "
                    ref={rowRef}
                >
                    {
                        movies?.map(movie => (
                            <Thumbnail key={movie.id} movieProps={movie} />
                        ))
                    }
                </div>
                <FiArrowRight
                    onClick={() => handleClick('right')}
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 
                    cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
            </div>
        </div>
    )
}

export default Row