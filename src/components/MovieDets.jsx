import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'
import FeedCards from './FeedCards'
import Topnav from './Topnav'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieDets, removeMovieDets } from '../store/details'


const MovieDets = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    // const [movieDets, setmovieDets] = useState([])
    const movieDets = useSelector(state => state.details.movieDets)
    // console.log(data)
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
            // setmovieDets(resp)
            dispatch(addMovieDets(resp))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMovieDets()
        return () => {
            dispatch(removeMovieDets())
        }
    }, [id])
    console.log(movieDets)
    return movieDets ? (
        <div style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/original${movieDets.details.backdrop_path || movieDets.details.poster_path || movieDets.details.profile_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "top",
        }} className='h-screen overflow-auto w-full pb-6'>


            <div className='h-[9%] px-8 w-full  flex gap-2 justify-between items-center mx-auto bg-zinc-300/20 backdrop-blur-md'>
                <div className="relative z-50 text-white"><button className='cursor-pointer' onClick={() => navigate(-1)}><i className="ri-arrow-left-line text-2xl hover:text-red-500 transition-colors"></i></button>
                    <button className='cursor-pointer ml-3' onClick={() => navigate('/feed')}><i className="ri-home-3-fill text-2xl "></i></button></div>
                <Topnav />
            </div>


            <div className=" max-w-screen-lg p-5 flex mx-auto gap-6 py-10">

                <div className='w-[22%] '>
                    <img src={`https://image.tmdb.org/t/p/original${movieDets.details.poster_path || movieDets.details.backdrop_path || movieDets.details.profile_path}'`} className='h-[300px] w-full  rounded-lg object-cover' alt="" />
                </div>

                <div className='w-[78%]'>
                    <h2 className='text-5xl text-white font-black'>{movieDets.details.title || movieDets.details.name || movieDets.details.original_name}</h2>
                    <div className="flex gap-4 items-center text-white my-3">
                        <p className='flex items-end'><i className="ri-star-fill text-yellow-400 mr-0.5"></i>{(movieDets.details.vote_average).toFixed(1)} | <small className='ml-1'> {movieDets.details.vote_count}</small></p>
                        <p className='ml-4'>{((movieDets.details.runtime) / 60).toFixed()}<small>h</small> {((movieDets.details.runtime) % 60)}<small>mins</small></p>
                        <p><span className='h-1 w-1 rounded-full bg-white inline-block'></span></p>
                        <p className='text-sm'><span className='mr-1'>{movieDets.details.genres.map(e => e.name).join(', ')}</span> | <span className='ml-1'>{movieDets.details.release_date}</span></p>
                        <a target='_blank' href={`${movieDets.details.homepage}`}><i className="ri-global-fill text-lg hover:text-blue-400"></i></a>
                    </div>
                    <p className=' text-zinc-300 my-3'>{movieDets.details.overview}</p>
                    <div className="flex gap-3 mb-3">
                        <Link to={`${pathname}/trailer`} className='px-4 py-1 rounded-md bg-red-500 inline-block text-white hover:bg-red-700 transition-colors  cursor-pointer font-semibold text-lg'>Watch trailer</Link>
                        <a target='_blank' href={`https://www.imdb.com/title/${movieDets.external_ids.imdb_id}/`} className='px-4 py-1 rounded-md bg-yellow-400 text-black hover:bg-yellow-500  transition-colors  cursor-pointer font-semibold text-lg flex items-center'>
                            <i className="ri-star-fill text-sm text-zinc-100 mr-1"></i>
                            <span>IMDB</span>
                        </a >
                    </div>
                    {movieDets.watch_providers && movieDets.watch_providers.flatrate && <div className='flex  mt-2 text-white tracking-tight text-nowrap items-center gap-4'>
                        Available on platforms: {movieDets.watch_providers.flatrate.map((e, i) => <img src={`https://image.tmdb.org/t/p/original${e.logo_path} `} title={e.provider_name} className='w-[45px] rounded-lg' />)}
                    </div>}
                </div>
            </div>
            <div className='max-w-screen-xl flex justify-center items-center gap-5 mb-4 mx-auto '>
                <p className='text-2xl text-white font-semibold'>Cast: </p>
                {movieDets.credit.cast.slice(0, 6).map((e, i) => (
                    <img key={i} src={`https://image.tmdb.org/t/p/original${e.profile_path}`} className='w-[6rem] shadow-lg h-[6rem] object-cover rounded-full' alt="" title={e.name || e.original_name} />
                ))}
                {movieDets.credit && movieDets.credit.cast.length > 6 && (
                    <Link className="w-[6rem] h-[6rem] flex flex-col items-center justify-center bg-zinc-300/20 backdrop-blur-md text-white rounded-full text-sm">
                        <p>{movieDets.credit.cast.length - 6} More</p>
                        <i className='ri-arrow-right-line'></i>
                    </Link>
                )}

            </div>
            <div className="gradient h-0.5 w-full bg-zinc-500"></div>
            <h2 className='text-white text-2xl px-3 py-4 font-bold'>Recommendations & Similar: </h2>
            <FeedCards title={'movie'} data={movieDets.recommendations && movieDets.recommendations.results.length > 0 ? movieDets.recommendations.results : movieDets.similar.results} />
            <Outlet />
        </div>
    ) : <Loader />
}

export default MovieDets