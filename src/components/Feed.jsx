import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import API_OPTIONS from '../utils/ApiOptions'
import { useDispatch, useSelector } from 'react-redux'
import { addTrendingMovies } from '../store/movieSlice'

const Feed = () => {
    const dispatch = useDispatch()

    const [sidebar, setSidebar] = useState(false)
    const fetchTrendingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', API_OPTIONS)
        const res = await data.json()
        dispatch(addTrendingMovies(res.results))
    }

    useEffect(() => {
        fetchTrendingMovies()
    }, [])
    const { trending } = useSelector(state => state.movies)
    if (!trending) return
    // const wallpaper = trending[Math.floor(Math.random() * trending.length)]
    const wallpaper = trending[1]
    return (
        <div className='h-screen flex w-full bg-zinc-100'>
            <Sidebar sidebar={sidebar} sidebarfn={setSidebar} />
            <div className="gradient w-[1px] h-full bg-zinc-300"></div>
            <Main data={wallpaper} sidebar={sidebar} sidebarfn={setSidebar} />
        </div>
    )
}

export default Feed