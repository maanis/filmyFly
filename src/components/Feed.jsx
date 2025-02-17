import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import API_OPTIONS from '../utils/ApiOptions'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedItems } from '../store/movieSlice'
import Loader from './Loader'

const Feed = () => {
    const [category, setcategory] = useState('all')
    const [wallpaper, setwallpaper] = useState(null)
    const dispatch = useDispatch()
    const [sidebar, setSidebar] = useState(false)
    const { feedItems } = useSelector(state => state.movies)
    const fetchFeedItems = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/${category}/day?language=en-US`, API_OPTIONS)
            const res = await data.json()
            dispatch(addFeedItems(res.results))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWallpaper = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/trending/${category}/day?language=en-US`, API_OPTIONS)
        const res = await data.json()
        setwallpaper(res.results[Math.floor(Math.random() * res.results.length)])
    }
    useEffect(() => {
        !feedItems && fetchFeedItems()
        !wallpaper && fetchWallpaper()
    }, [category])


    return wallpaper ? (
        <div className='h-screen flex w-full bg-zinc-100'>
            {/* <Sidebar sidebar={sidebar} sidebarfn={setSidebar} /> */}
            <div className="gradient w-[1px] h-full bg-zinc-300"></div>
            <Main func={setcategory} data={wallpaper} sidebar={sidebar} sidebarfn={setSidebar} />


        </div>
    ) : <Loader />
}

export default Feed