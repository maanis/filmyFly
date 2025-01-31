import React, { useEffect } from 'react'
import MovieTitle from './MovieTitle'
import MovieBG from './MovieBG'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import { useSelector } from 'react-redux'

const PrimarySec = () => {
    useNowPlayingMovies()
    const { nowPlaying } = useSelector(state => state.movies)
    if (!nowPlaying) return;
    const primaryMovie = nowPlaying[0]
    const { original_title, overview, release_date, id } = primaryMovie
    return (
        <div className='relative'>
            <MovieBG id={id} />
            <MovieTitle title={original_title} overview={overview} release_date={release_date} />
        </div>
    )
}

export default PrimarySec