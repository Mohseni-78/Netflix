import { Movie } from '@/typing'
import React from 'react'

interface props {
    movies: Movie[]
}
const MyListCom = ({ movies }: props) => {
    return (
        <>
            {
                movies.length < 1
                && (<p>Empty</p>)
            }
            {movies.map(item => (<p key={item.id}>{item.title}</p>))}
        </>
    )
}

export default MyListCom