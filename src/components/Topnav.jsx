import React, { useEffect, useState } from 'react'
import API_OPTIONS from '../utils/ApiOptions'
import { useDispatch, useSelector } from 'react-redux'
import { addQueryDets } from '../store/movieSlice'
import noImg from '/noImg.jpg'
import { Link } from 'react-router-dom'

const Topnav = () => {
    const [input, setinput] = useState('')
    const dispatch = useDispatch()
    const { queryResults } = useSelector(state => state.movies)
    const querySearch = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const data = await res.json()
        dispatch(addQueryDets(data.results))
    }
    useEffect(() => {
        querySearch()
    }, [input])

    return (
        <div className='flex relative w-[26rem] items-center max-md:w-[20rem]'>
            

            <span className='text-2xl max-md:text-lg text-zinc-200 absolute left-2'><i className="ri-search-eye-line"></i></span>
            <input value={input} onChange={(e) => setinput(e.currentTarget.value)} className='w-full  border-1 text-white border-zinc-400 text-2xl px-10 max-md:px-8 py-2  max-md:h-[2rem] outline-none rounded-md shadow-md' type="text" name="" id="" />
            {input && <span onClick={() => setinput('')} className='text-3xl absolute right-2 max-md:text-lg cursor-pointer text-zinc-200 ml-2'><i className="ri-close-fill"></i></span>}
            {input && <div className={`absolute w-[100%] p-3 overflow-y-auto h-[20rem] ${input && 'bg-zinc-400/65 backdrop-blur-lg'} top-[55px]`}>
                {queryResults && queryResults.map((e, i) => (
                    <Link to={`/${e.media_type}/${e.id}`} key={i} className="flex mb-3 rounded-md items-center gap-4 p-2 h-[6rem] max-md:h-[5rem] bg-zinc-300/65 backdrop-blur-sm w-full">
                        <img className='w-16 max-md:w-12 h-full object-cover' src={e.backdrop_path || e.poster_path || e.profile_path
                            ? `https://image.tmdb.org/t/p/original${e.backdrop_path || e.poster_path || e.profile_path}`
                            : noImg} alt="" />
                        <div>
                            <h2 className='font-bold max-md:text-[16px] text-xl'>{e.name || e.original_title || e.original_name}</h2>
                            <p className='text-sm text-zinc-600'>{e.media_type}</p>
                        </div>
                    </Link>
                ))}

            </div>}
        </div>
    )
}

export default Topnav