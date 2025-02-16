import React from 'react'
import Cards from './Cards'
import DetsNav from './DetsNav'
import { useSelector } from 'react-redux'

const Playlist = () => {
    const playlist = useSelector(state => state.movies.playlist)
    return (
        <div className='h-screen w-full bg-zinc-800'>
            <DetsNav />
            <Cards data={playlist} />
        </div>
    )
}

export default Playlist