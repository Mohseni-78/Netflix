import React from 'react'
import MyListCom from '@/components/MyListCom'
import { useList } from '@/contexts/ListContextProvider'


const MyList = () => {
    const { list } = useList()
    return (
        <MyListCom movies={list} />
    )
}

export default MyList