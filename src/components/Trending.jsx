import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import { addTrending } from '../store/movieSlice'

const Trending = () => {
    const [category, setcategory] = useState('all')
    const fetchFeedItems = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/${category}/day?language=en-US`, API_OPTIONS)
            const res = await data.json()
            dispatch(addTrending(res.results))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchFeedItems()
    }, [category])
    return (
        <div className='h-screen w-full bg-zinc-100'>
            <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                <p className='text-2xl font-semibold'>Trending</p>
                <Dropdown options={['all', 'movie', 'tv',]} method={setcategory} />

            </div>
        </div>
    )
}

export default Trending