import React from 'react'
// Imported Types ==========>
import { Movie } from '@/typing'

interface props {
    movies: Movie[]
}
const MyListCom = ({ movies }: props) => {
    return (
        <>
        <h1 className='text-2xl w-1/5 mx-auto relative mt-5'>Comming Soon...</h1>
            {
                movies.length < 1 ? (<p>Empty</p>) : movies.map(item => (<p key={item.id}>{item.title}</p>))
            }

        </>
    )
}

export default MyListCom