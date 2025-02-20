import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import API_OPTIONS from '../utils/ApiOptions'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedItems } from '../store/movieSlice'
import Loader from './Loader'
import { toggleSidebar } from '../store/utils'

const Feed = () => {
    const [category, setcategory] = useState('all')
    const [wallpaper, setwallpaper] = useState(null)
    const dispatch = useDispatch()
    // const [sidebar, setSidebar] = useState(false)
    const sidebar = useSelector(state => state.utils)
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
    fetchFeedItems()
    fetchWallpaper()
}, [category])



return wallpaper ? (
    <div className='h-screen flex w-full overflow-x-hidden max-md:bg-zinc-950'>
        {sidebar && <div onClick={() => dispatch(toggleSidebar(false))} className="fixed transition-all delay-300 h-full w-full bg-black/45 md:hidden z-[999]"></div>}
        <div className="gradient w-[1px] h-full bg-zinc-300 max-md:hidden"></div>
        <Main func={setcategory} data={wallpaper} sidebar={sidebar} />


    </div>
) : <Loader />
}

export default Feed