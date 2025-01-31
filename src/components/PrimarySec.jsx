import React, { useEffect } from 'react'
import MovieTitle from './MovieTitle'
import MovieBG from './MovieBG'
import API_OPTIONS from '../utils/ApiOptions'

const PrimarySec = () => {

    const fetchingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
        const json = await data.json()
        console.log(json.results)
    }
    useEffect(() => {
        fetchingMovies()
    }, [])
    return (
        <div>
            <MovieBG />
            <MovieTitle />
        </div>
    )
}

export default PrimarySec