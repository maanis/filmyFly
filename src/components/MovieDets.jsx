import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'


const MovieDets = () => {
    const { id } = useParams()
    const navigate = useNavigate()
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
                `movie/${id}/watch/providers`,
                `movie/${id}/external_ids`
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => fetch(`https://api.themoviedb.org/3/${endpoint}`, API_OPTIONS))
            );

            const data = await Promise.all(responses.map(res => res.json()));

            const [
                details, credit, recommendations, release_dates,
                reviews, similar, videos, watch_providers, external_ids
            ] = data;

            const resp = {
                details,
                credit,
                recommendations,
                release_dates,
                reviews,
                similar,
                videos,
                watch_providers: watch_providers.results.IN,
                external_ids
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


            <div className='max-w-screen-xl h-[5%] flex gap-2 items-center mx-auto bg-red-200'>
                <button onClick={() => navigate(-1)}><i className="ri-arrow-left-line text-2xl hover:text-red-500 transition-colors"></i></button>
                <a target='_blank' href={`https://www.imdb.com/title/${movieDets.external_ids.imdb_id}/`}><i className="ri-pencil-fill text-2xl hover:text-yellow-500 transition-colors"></i></a>
                <a target='_blank' href={`https://www.wikidata.org/wiki/${movieDets.external_ids.wikidata_id}`}><i className="ri-global-fill text-2xl "></i></a>
                <a target='_blank' href={`${movieDets.details.homepage}`}><i className="ri-home-3-fill text-2xl "></i></a>
            </div>


            <div className=" max-w-screen-lg p-5 flex mx-auto gap-6 py-10">

                <img src={`https://image.tmdb.org/t/p/original${movieDets.details.poster_path || movieDets.details.backdrop_path || movieDets.details.profile_path}'`} className='h-[300px] w-[220px]  rounded-lg object-cover' alt="" />

                <div>
                    <h2 className='text-5xl text-white font-black'>{movieDets.details.title || movieDets.details.name || movieDets.details.original_name}</h2>
                    <div className="flex gap-4 items-end text-white my-3">
                        <p className='flex items-end'><i class="ri-star-fill text-yellow-400 mr-0.5"></i>{(movieDets.details.vote_average).toFixed(1)} | <small className='ml-1'> {movieDets.details.vote_count}</small></p>
                        <p className='ml-4'>{((movieDets.details.runtime) / 60).toFixed()}<small>h</small> {((movieDets.details.runtime) % 60)}<small>mins</small></p>
                        <p><span className='h-1 w-1 rounded-full bg-white inline-block'></span></p>
                        <p className='text-sm'><span className='mr-1'>{movieDets.details.genres.map(e => e.name).join(', ')}</span> | <span className='ml-1'>{movieDets.details.release_date}</span></p>
                    </div>
                    <p className=' text-zinc-300  my-3'>{movieDets.details.overview}</p>
                </div>
            </div>
        </div>
    ) : <Loader />
}

export default MovieDets