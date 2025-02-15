import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Trailer = () => {
    const movieDets = useSelector(state => state.details.info)
    console.log(movieDets.videos.results)
    const trailerId = movieDets.videos.results.filter(e => e.type === 'Trailer') || movieDets.videos.results
    console.log(trailerId[0])
    const id = trailerId[0].key
    console.log(id)
    const navigate = useNavigate()
    return (

        <div className='absolute flex justify-center items-center h-full w-full bg-black/80 top-0 left-0'>
            <i onClick={() => navigate(-1)} class="ri-close-fill absolute top-[4%] right-[14%] cursor-pointer hover:text-red-500 transition-colors text-5xl text-white"></i>
            <div className='h-[550px] w-[1080px] overflow-hidden rounded-lg'>
                <ReactPlayer controls height={550} width={1080} url={`https://www.youtube.com/watch?v=${id}`} />
            </div>
        </div>
    )
}

export default Trailer