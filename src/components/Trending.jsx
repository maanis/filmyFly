import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import { addTrending } from '../store/movieSlice'
import Cards from './Cards'
import Loader from './Loader'

const Trending = () => {
    const [trending, settrending] = useState([])
    const [category, setcategory] = useState('all')
    const fetchFeedItems = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/${category}/day?language=en-US`, API_OPTIONS)
            const res = await data.json()
            // dispatch(addTrending(res.results))
            settrending(res.results)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchFeedItems()
    }, [category])

    console.log(trending)

    return trending.length > 0 ? (
        <div className='h-screen w-full'>
            <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                <p className='text-2xl font-semibold'>Trending</p>
                <Dropdown options={['all', 'movie', 'tv',]} method={setcategory} />
            </div>
            <Cards data={trending} />
        </div>
    ) : <Loader />
}

export default Trending