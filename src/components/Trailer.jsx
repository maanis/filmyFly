import React from 'react'
import ReactPlayer from 'react-player'

const Trailer = () => {
    return (
        <div className='absolute flex justify-center items-center h-full w-full bg-black/80 top-0 left-0'>
            <ReactPlayer />
        </div>
    )
}

export default Trailer