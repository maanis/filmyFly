import React, { useEffect, useState } from 'react'
import API_OPTIONS from '../utils/ApiOptions'
import { useDispatch, useSelector } from 'react-redux'
import { addQueryDets } from '../store/movieSlice'
import noImg from '../../public/noImg.jpg'

const Topnav = () => {
    const [input, setinput] = useState('')
    const dispatch = useDispatch()
    const { queryResults } = useSelector(state => state.movies)
    console.log(queryResults)
    const querySearch = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const data = await res.json()
        dispatch(addQueryDets(data.results))
    }
    useEffect(() => {

        querySearch()
    }, [input])

    return (
        <div className='h-[9%] shadow-md flex items-center justify-end w-full px-8'>
            <div className='flex relative w-[32rem]'>
                <span className='text-2xl absolute left-2'><i className="ri-search-eye-line"></i></span>
                <input value={input} onChange={(e) => setinput(e.currentTarget.value)} className='w-full border-2 border-zinc-100 text-xl px-10 outline-none border-none shadow-md' type="text" name="" id="" />
                <span onClick={() => setinput('')} className='text-3xl cursor-pointer ml-2'><i className="ri-close-fill"></i></span>
                <div className={`absolute w-[93%] p-3 overflow-y-auto h-[20rem] ${input && 'bg-zinc-300'} top-[52px]`}>
                    {queryResults && queryResults.map((e, i) => (
                        <div key={i} className="flex mb-3 rounded-md items-center gap-4 p-2 h-[6rem] bg-red-200 w-full">
                            <img className='w-16 h-full object-cover' src={e.backdrop_path || e.poster_path || e.profile_path
                                ? `https://image.tmdb.org/t/p/original${e.backdrop_path || e.poster_path || e.profile_path}`
                                : noImg} alt="" />
                            <div>
                                <h2 className='font-bold text-xl'>{e.name || e.original_title || e.original_name}</h2>
                                <p className='text-sm text-zinc-600'>{e.media_type}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Topnav