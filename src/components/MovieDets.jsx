import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'

const MovieDets = () => {
    const { id } = useParams()
    const fetchMovieDets = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, API_OPTIONS)
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMovieDets()
    }, [])
    return (
        <div className='relative left-[5%]'>MovieDets</div>
    )
}

export default MovieDets