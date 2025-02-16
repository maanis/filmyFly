import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'
import FeedCards from './FeedCards'
import Topnav from './Topnav'
import { useDispatch, useSelector } from 'react-redux'
import { addTvDets, removeTvDets } from '../store/details'
import { noImg } from '../utils/constants'
import DetsNav from './DetsNav'
import { toggle } from '../store/movieSlice'


const TvDets = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const TvDets = useSelector(state => state.details.info)
    const fetchTvDets = async () => {
        try {
            const endpoints = [
                `tv/${id}?language=en-US`,
                `tv/${id}/credits?language=en-US`,
                `tv/${id}/recommendations?language=en-US&page=1`,
                `tv/${id}/reviews?language=en-US`,
                `tv/${id}/similar?language=en-US&page=1`,
                `tv/${id}/videos?language=en-US`,
                `tv/${id}/external_ids`
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => fetch(`https://api.themoviedb.org/3/${endpoint}`, API_OPTIONS))
            );

            const data = await Promise.all(responses.map(res => res.json()));

            const [
                details, credit, recommendations,
                reviews, similar, videos, external_ids
            ] = data;

            const resp = {
                details,
                credit,
                recommendations,

                reviews,
                similar,
                videos,
                // watch_providers: watch_providers.results.IN,
                external_ids
            }
            dispatch(addTvDets(resp))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTvDets()
        return () => {
            dispatch(removeTvDets())
        }
    }, [id])
    // console.log(TvDets.details.success)
    console.log(TvDets)
    return TvDets ? (
        <div style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('https://image.tmdb.org/t/p/original${TvDets.details.backdrop_path || TvDets.details.poster_path || TvDets.details.profile_path}') `,
            backgroundSize: "cover",
            backgroundPosition: "top",
        }} className='h-screen overflow-auto w-full pb-6'>


            <DetsNav />


            <div className=" max-w-screen-lg p-5 flex mx-auto gap-6 py-10">

                <div className='w-[22%] '>
                    <img src={TvDets.details.poster_path || TvDets.details.backdrop_path || TvDets.details.profile_path ? `https://image.tmdb.org/t/p/original${TvDets.details.poster_path || TvDets.details.backdrop_path || TvDets.details.profile_path}'` : noImg} className='h-[300px] w-full  rounded-lg object-cover' alt="" />
                </div>

                <div className='w-[78%]'>
                    <h2 className='text-5xl text-white font-black'>{TvDets.details.title || TvDets.details.name || TvDets.details.original_name}</h2>
                    <div className="flex gap-4 items-center text-white my-3">
                        <p className='flex items-end'><i className="ri-star-fill text-yellow-400 mr-0.5"></i>{(TvDets.details.vote_average).toFixed(1)} | <small className='ml-1'> {TvDets.details.vote_count}</small></p>
                        <p className='ml-4'>{TvDets.details.seasons.length}<small> Seasons</small></p>
                        <p><span className='h-1 w-1 rounded-full bg-white inline-block'></span></p>
                        <p className='text-sm'><span className='mr-1'>{TvDets.details.genres.map(e => e.name).join(', ')}</span> | <span className='ml-1'>{TvDets.details.first_air_date || TvDets.details.last_air_date}</span></p>
                        <a target='_blank' href={`${TvDets.details.homepage}`}><i className="ri-global-fill text-lg hover:text-blue-400"></i></a>
                    </div>
                    <p className=' text-zinc-300 my-3'>{TvDets.details.overview}</p>
                    <div className="flex gap-3 mb-3">
                        <Link to={`${pathname}/trailer`} className='px-4 py-1 rounded-md bg-red-500 inline-block text-white hover:bg-red-700 transition-colors  cursor-pointer font-semibold text-lg'>Watch trailer</Link>
                        <a target='_blank' href={`https://www.imdb.com/title/${TvDets.external_ids.imdb_id}/`} className='px-4 py-1 rounded-md bg-yellow-400 text-black hover:bg-yellow-500  transition-colors  cursor-pointer font-semibold text-lg flex items-center'>
                            <i className="ri-star-fill text-sm text-zinc-100 mr-1"></i>
                            <span>IMDB</span>
                        </a >
                        <button onClick={() => dispatch(toggle({ Dets: TvDets.details, title: 'tv' }))} className='bg-white px-2 cursor-pointer rounded-sm'><i className="ri-bookmark-line text-xl"></i></button>
                    </div>
                    {TvDets.watch_providers && TvDets.watch_providers.flatrate && <div className='flex  mt-2 text-white tracking-tight text-nowrap items-center gap-4'>
                        Available on platforms: {TvDets.watch_providers.flatrate.map((e, i) => <img src={`https://image.tmdb.org/t/p/original${e.logo_path} `} title={e.provider_name} className='w-[45px] rounded-lg' />)}
                    </div>}
                </div>
            </div>
            <div className='max-w-screen-xl flex justify-center items-center gap-5 mb-4 mx-auto '>
                <p className='text-2xl text-white font-semibold'>Cast: </p>
                {TvDets.credit.cast.slice(0, 6).map((e, i) => (
                    <Link key={i} to={`/person/${e.id}`}><img src={`https://image.tmdb.org/t/p/original${e.profile_path}`} className='w-[6rem] shadow-lg h-[6rem] object-cover rounded-full' alt="" title={e.name || e.original_name} /></Link>
                ))}
                {TvDets.credit && TvDets.credit.cast.length > 6 && (
                    <Link className="w-[6rem] h-[6rem] flex flex-col items-center justify-center bg-zinc-300/20 backdrop-blur-md text-white rounded-full text-sm">
                        <p>{TvDets.credit.cast.length - 6} More</p>
                        <i className='ri-arrow-right-line'></i>
                    </Link>
                )}

            </div>
            {TvDets.details.seasons.length > 1 && <>
                <div className="gradient h-0.5 w-full bg-zinc-500"></div>
                <h2 className='text-white text-2xl px-3 py-4 font-bold'>Seasons:</h2>
                <FeedCards title={'tv'} data={TvDets.details.seasons && TvDets.details.seasons.length > 0 && TvDets.details.seasons} />
            </>}

            <div className="gradient h-0.5 w-full bg-zinc-500"></div>
            <h2 className='text-white text-2xl px-3 py-4 font-bold'>Recommendations & Similar: </h2>
            <FeedCards title={'tv'} data={TvDets.recommendations && TvDets.recommendations.results.length > 0 ? TvDets.recommendations.results : TvDets.similar.results} />
            <Outlet />
        </div>
    ) : <Loader />
}

export default TvDets