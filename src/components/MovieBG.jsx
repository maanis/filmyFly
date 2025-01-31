import React, { useEffect, useState } from 'react'
import API_OPTIONS from '../utils/ApiOptions'

const MovieBG = ({ id }) => {
    const [code, setcode] = useState(null)
    const fetchTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json()
        const filterData = json.results.filter(video => video.type === "Teaser")
        const trailer = filterData.length ? filterData[0] : json.results[0]
        console.log(trailer)
        setcode(trailer.key)
    }
    useEffect(() => {
        fetchTrailer()
    }, [])

    console.log(code)
    return (
        <div className='h-screen w-full '>
            <iframe className='h-full w-full object-cover' src={`https://www.youtube.com/embed/${code}?si=F2iv_eriVXsWdhnk`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default MovieBG