import React, { useState, useEffect } from 'react'
// Imported Context =======>
import { useModal } from '@/contexts/ModalContextProvider';
import { useMovie } from '@/contexts/MovieContextProvider';
import { useLike } from '@/contexts/LikedContextProvider';
import { useList } from '@/contexts/ListContextProvider';
// Imported Types =======>
import { Element } from '@/typing';
// Imported mui =======>
import { Modal } from '@mui/material';
// ReactPlayer =======>
import ReactPlayer from 'react-player';
// reactHotToast==========>
import { toast } from 'react-hot-toast';
// Imported Icons ===========>
import { BsFillPlayFill } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { GoMute, GoUnmute } from 'react-icons/go'




const ModalCom = () => {
    // States
    const [trailer, setTrailer] = useState<string>('')
    const [muted, setMuted] = useState<boolean>(true)
    const [genres, setGenres] = useState([])
    // Context
    const { openModal, setOpenModal } = useModal()
    const { movie, setMovie } = useMovie();
    const { like, setLike } = useLike();
    const { list, setList } = useList();
    // console.log(movie);



    const handleClose = () => {
        setOpenModal(false)
        setMovie(null)
    };

    useEffect(() => {
        if (!movie) return
        const fetchMovieTrailer = async () => {
            await fetch(`https://api.themoviedb.org/3/${movie?.media_type === 'tv'
                ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`)
                .then(res => res.json()).then(data => {
                    if (data?.videos) {
                        const trailerI = data.videos.results.findIndex((element: Element) => element.type === "Trailer");
                        setTrailer(data.videos?.results[trailerI]?.key)
                        setGenres(data.genres);
                    }
                })
        }
        fetchMovieTrailer()
    }, [movie]);

    return (

        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modalCustom'
            sx={{
                position: "fixed", top: "20px", left: "0", right: "0",
                zIndex: "50", marginX: "auto", width: "70%",
                borderRadius: "15px", overflow: 'hidden', overflowY: 'scroll'
            }}
        >
            <div>
                <button
                    className='rounded-full absolute right-5
                    top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#444444]'
                    onClick={() => setOpenModal(false)}>
                    &times;
                </button>
                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}

                    />
                    {/* Buttons video */}
                    <div className="absolute bottom-4 left-5 flex items-center justify-between w-full ">
                        <div className='flex gap-x-4 items-center'>
                            {/* Play */}
                            <button className='md:px-3 px-1 md:py-1 font-bold bg-white text-black flex items-center justify-between rounded'>
                                <BsFillPlayFill className='w-6 h-6' />
                                Play
                            </button>
                            {/* Plus */}
                            {

                                list.some(item => item.id === movie?.id)
                                    ? (
                                        <IoIosCheckmarkCircle
                                            className='w-9 h-9 cursor-pointer hover:opacity-80'
                                            onClick={() => {
                                                const index = list.findIndex((item) => item.id === movie?.id);
                                                list.splice(index, 1);
                                                setList(prev => ([...prev]))
                                                toast.success(`${movie?.title || movie?.original_name} remove from list`)
                                            }} />
                                    )
                                    : (<button
                                        onClick={() => {
                                            const result = list.some(item => item.id === movie?.id);
                                            if (result) {
                                                toast.error(`${movie?.title || movie?.original_name} is on the list`)
                                            } else {
                                                setList((prev: any) => ([...prev, movie]));
                                                toast.success(`${movie?.title || movie?.original_name} Add to list`)
                                            }
                                        }}
                                        className='rounded-full px-2 md:px-3 md:py-1 border'>
                                        +
                                    </button>)
                            }
                            {/* Like */}
                            <button className='rounded-full p-0.5 md:px-1 md:py-1 border'>
                                {

                                    like.some(item => item === movie?.id)
                                        ? (
                                            <AiFillLike
                                                className='w-6 h-6'
                                                onClick={() => {
                                                    const index = like.findIndex(item => item === movie!.id);
                                                    like.splice(index, 1);
                                                    setLike((prev: typeof like) => [...prev])
                                                    toast.success("unlike success")
                                                }}
                                            />
                                        )
                                        : (
                                            <AiOutlineLike
                                                className='w-6 h-6'
                                                onClick={() => {
                                                    setLike((prev: typeof like) => [...prev, movie?.id])
                                                    toast.success("like success")
                                                }} />
                                        )
                                }
                            </button>
                        </div>
                        {/* Mute */}
                        <div>
                            <button
                                className='rounded-full p-0.5 md:px-1 md:py-1 border mr-10'
                                onClick={() => setMuted(prev => !prev)}
                            >
                                {
                                    muted
                                        ?
                                        (
                                            <GoMute className="w-6 h-6" />
                                        )
                                        :
                                        (
                                            <GoUnmute className="w-6 h-6" />
                                        )
                                }
                            </button>
                        </div>
                    </div>
                </div>
                {/* Informations */}
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 md:text-lg text-sm">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">
                                {Math.round(((movie?.vote_average || 0) * 10))}% Match
                            </p>
                            <p className="font-light">
                                {movie?.release_date || movie?.first_air_date}
                            </p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres:</span>{' '}
                                    {genres.map((genre: any) => genre.name).join(', ')}
                                </div>
                                <div>
                                    <span className="text-[gray]">Original language:</span>{' '}
                                    {movie?.original_language}
                                </div>
                                <div>
                                    <span className="text-[gray]">Total votes:</span>{' '}
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalCom