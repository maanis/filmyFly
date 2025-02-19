import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Trailer = () => {
    const movieDets = useSelector(state => state.details.info)
    const navigate = useNavigate()

    if (!movieDets?.videos?.results || movieDets.videos.results.length === 0) {
        return (
            <div className='absolute flex justify-center items-center h-full w-full bg-black/80 top-0 left-0'>
                <i onClick={() => navigate(-1)} className="ri-close-fill absolute top-[4%] right-[14%] cursor-pointer hover:text-red-500 transition-colors text-5xl text-white"></i>
                <p className="text-white text-xl">No trailer available</p>
            </div>
        )
    }

    const trailerId = movieDets.videos.results.filter(e => e.type === 'Trailer')
    const id = trailerId.length > 0 ? trailerId[0].key : null

    return (
        <div className='absolute flex justify-center items-center h-full w-full bg-black/80 top-0 left-0'>
            <i onClick={() => navigate(-1)} className="ri-close-fill absolute top-[4%] right-[14%] max-md:right-[5%] max-[768px]:top-[7%] max-[450px]:top-[30%] max-md:text-3xl cursor-pointer hover:text-red-500 transition-colors text-5xl text-white"></i>
            <div className='h-[550px] max-[768px]:h-[420px] max-[602px]:h-[360px] max-[602px]:w-[480px] max-[450px]:h-[280px] max-[450px]:w-[360px] w-[1080px] max-[768px]:w-[620px] overflow-hidden rounded-lg'>
                {id ? (
                    <ReactPlayer controls height={'100%'} width={'100%'} url={`https://www.youtube.com/watch?v=${id}`} />
                ) : (
                    <p className="text-white text-xl text-center">No trailer available</p>
                )}
            </div>
        </div>
    )
}

export default Trailer
