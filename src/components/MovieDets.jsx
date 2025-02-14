import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'


const MovieDets = () => {
    const { id } = useParams()
    const [movieDets, setmovieDets] = useState([])
    const fetchMovieDets = async () => {
        try {
            const endpoints = [
                `movie/${id}?language=en-US`,
                `movie/${id}/credits?language=en-US`,
                `movie/${id}/recommendations?language=en-US`,
                `movie/${id}/release_dates?language=en-US`,
                `movie/${id}/reviews?language=en-US`,
                `movie/${id}/similar?language=en-US`,
                `movie/${id}/videos?language=en-US`,
                `movie/${id}/watch/providers`
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => fetch(`https://api.themoviedb.org/3/${endpoint}`, API_OPTIONS))
            );

            const data = await Promise.all(responses.map(res => res.json()));

            const [
                details, credit, recommendations, release_dates,
                reviews, similar, videos, watch_providers
            ] = data;

            const resp = {
                details,
                credit,
                recommendations,
                release_dates,
                reviews,
                similar,
                videos,
                watch_providers
            }
            setmovieDets(resp)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMovieDets()
    }, [])
    console.log(movieDets)
    return movieDets.length != [] ? (
        <div style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/original${movieDets.details.backdrop_path || movieDets.details.poster_path || movieDets.details.profile_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "top",
        }} className='h-screen w-full'>
            
        </div>
    ) : <Loader />
}

export default MovieDets