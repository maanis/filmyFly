import React, { useEffect, useState } from 'react'
import API_OPTIONS from '../utils/ApiOptions'

const MovieBG = ({ id }) => {
    const [code, setcode] = useState(null)
    const fetchTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json()
        const filterData = json.results.filter(video => video.type === "Teaser")
        const trailer = filterData.length ? filterData[0] : json.results[0]
        setcode(trailer.key)
    }
    useEffect(() => {
        fetchTrailer()
    }, [])

    return (
        <div className='h-screen w-full '>
            <iframe className='w-full aspect-video object-cover object-top' src={`https://www.youtube.com/embed/${code}?autoplay=1&mute=1&loop=1&playlist=${code}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1`}
                title="YouTube video player" ></iframe>
        </div >
    )
}

export default MovieBG