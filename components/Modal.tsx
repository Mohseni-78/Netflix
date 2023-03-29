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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                Play
                            </button>
                            {/* Plus */}
                            {
                                list.includes(movie)
                                    ? (<svg
                                        onClick={() => {
                                            const index = list.findIndex(item => item.id === movie?.id);
                                            list.splice(index, 1);
                                            setList(prev => ([...prev]))
                                            toast.success(`${movie?.title || movie?.original_name} remove from list`)
                                        }}
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 cursor-pointer hover:opacity-80">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>)
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
                            <button
                                className='rounded-full p-0.5 md:px-1 md:py-1 border'>

                                {
                                    like.includes(movie?.id)
                                        ? (
                                            <svg
                                                onClick={() => {
                                                    const index = like.findIndex(item => item === movie!.id);
                                                    like.splice(index, 1);
                                                    setLike((prev: any) => [...prev])
                                                    toast.success("unlike success")
                                                }}
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                            </svg>)
                                        : (<svg
                                            onClick={() => {
                                                !like.includes(movie?.id) && setLike((prev: any) => [...prev, movie?.id])
                                                toast.success("like success")
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                        </svg>)
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
                                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                                        </svg>)
                                        :
                                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                            <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                                        </svg>)
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
                                {(movie?.vote_average || 0) * 10}% Match
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