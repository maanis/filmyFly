import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'
import FeedCards from './FeedCards'
import Topnav from './Topnav'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieDets, removeMovieDets } from '../store/details'
import DetsNav from './DetsNav'
import { toggle } from '../store/movieSlice'
// import { togglePlayList } from '../store/movieSlice'


const MovieDets = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [save, setsave] = useState(true)
    const navigate = useNavigate()
    // const [movieDets, setmovieDets] = useState([])
    const movieDets = useSelector(state => state.details.info)
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
        }
    }
    const playlist = useSelector(state => state.movies.playlist)
    useEffect(() => {
        fetchMovieDets()
        const exist = playlist.findIndex(e => e.Dets.id == id)
        if (exist != -1) {
            setsave(true)
        } else {
            setsave(false)
        }
        return () => {
            dispatch(removeMovieDets())
        }
    }, [id, playlist])







    return movieDets ? (
        <div style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/original${movieDets.details.backdrop_path || movieDets.details.poster_path || movieDets.details.profile_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "top",
        }} className='h-screen overflow-auto w-full pb-6'>


            <DetsNav />


            <div className=" max-w-screen-lg p-5 max-md:p-4 max-sm:p-3 max-sm:pt-5 flex items-center max-[728px]:flex-col max-[728px]:justify-center mx-auto gap-6 py-10">

                <div className='w-[22%] max-[1066px]:w-[19%] max-[768px]:w-[32%] max-[728px]:w-[14rem]'>
                    <img src={`https://image.tmdb.org/t/p/original${movieDets.details.poster_path || movieDets.details.backdrop_path || movieDets.details.profile_path}'`} className='h-[300px] w-full  rounded-lg object-cover' alt="" />
                </div>

                <div className='w-[78%] max-[768px]:w-[68%] max-[728px]:w-full max-[728px]:flex max-[728px]:flex-col items-center'>
                    <h2 className='text-5xl max-[1066px]:text-4xl max-md:text-3xl text-white font-black'>{movieDets.details.title || movieDets.details.name || movieDets.details.original_name}</h2>
                    <div className="flex gap-4 max-[728px]:gap-2 max-[500px]:gap-1 max-[1066px]:text-xs max-[468px]:text-[8px] items-center text-white my-3 max-md:my-1">
                        <p className='flex items-end'><i className="ri-star-fill text-yellow-400 mr-0.5"></i>{(movieDets.details.vote_average).toFixed(1)} | <small className='ml-1'> {movieDets.details.vote_count}</small></p>
                        <p className='ml-4'>{((movieDets.details.runtime) / 60).toFixed()}<small>h</small> {((movieDets.details.runtime) % 60)}<small>mins</small></p>
                        <p><span className='h-1 w-1 rounded-full bg-white inline-block'></span></p>
                        <p className='text-sm max-[768px]:text-xs max-[468px]:text-[8px]'><span className='mr-1'>{movieDets.details.genres.map(e => e.name).join(', ')}</span> | <span className='ml-1 max-[768px]:text-xs max-[468px]:text-[8px]'>{movieDets.details.release_date}</span></p>
                        <a target='_blank' href={`${movieDets.details.homepage}`}><i className="ri-global-fill text-lg hover:text-blue-400"></i></a>
                    </div>
                    <p className=' text-zinc-300 my-3 max-md:my-2 max-[1066px]:text-sm max-md:text-xs max-[728px]:w-[75%]'>{movieDets.details.overview}</p>
                    <div className="flex gap-3 mb-3">
                        <Link to={`${pathname}/trailer`} className='px-4 py-1 rounded-md bg-red-500 inline-block text-white hover:bg-red-700 max-md:text-sm transition-colors  cursor-pointer font-semibold text-lg'>Watch trailer</Link>
                        <a target='_blank' href={`https://www.imdb.com/title/${movieDets.external_ids.imdb_id}/`} className='px-4 py-1 rounded-md bg-yellow-400 text-black hover:bg-yellow-500  max-md:text-sm transition-colors  cursor-pointer font-semibold text-lg flex items-center'>
                            <i className="ri-star-fill text-sm text-zinc-100 mr-1"></i>
                            <span>IMDB</span>
                        </a >
                        <button onClick={() => dispatch(toggle({ Dets: movieDets.details, title: 'movie' }))} className='bg-white px-2 cursor-pointer rounded-sm'><i className={`${save ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-xl`}></i></button>
                    </div>
                    {movieDets.watch_providers && movieDets.watch_providers.flatrate && <div className='flex  mt-2 text-white tracking-tight text-nowrap items-center gap-4'>
                    </div>}
                </div>
            </div>
            <div className='max-w-screen-xl flex justify-center max-[890px]:flex-col items-center gap-5 mb-4 mx-auto '>
                <p className='text-2xl  text-white font-semibold'>Cast: </p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {movieDets.credit.cast.slice(0, 6).map((e, i) => (
                        <Link key={i} to={`/person/${e.id}`}><img src={`https://image.tmdb.org/t/p/original${e.profile_path}`} className='w-[6rem] shadow-lg h-[6rem] object-cover rounded-full' alt="" title={e.name || e.original_name} /></Link>
                    ))}
                </div>
                {movieDets.credit && movieDets.credit.cast.length > 6 && (
                    <Link className="w-[6rem] h-[6rem] flex flex-col items-center justify-center bg-zinc-300/20 backdrop-blur-md text-white rounded-full text-sm">
                        <p>{movieDets.credit.cast.length - 6} More</p>
                        <i className='ri-arrow-right-line'></i>
                    </Link>
                )}

            </div>
            <div className="gradient h-0.5 w-full bg-zinc-500"></div>
            <h2 className='text-white text-2xl px-3 py-4 font-bold max-md:text-xl max-sm:text-lg text-center text-nowrap'>Recommendations & Similar: </h2>
            <FeedCards title={'movie'} data={movieDets.recommendations && movieDets.recommendations.results.length > 0 ? movieDets.recommendations.results : movieDets.similar.results} />
            <Outlet />
        </div>
    ) : <Loader />
}

export default MovieDets