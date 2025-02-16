import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API_OPTIONS from '../utils/ApiOptions'
import Loader from './Loader'
import FeedCards from './FeedCards'
import { useDispatch, useSelector } from 'react-redux'
import { addPersonDets, removePersonDets } from '../store/details'
import { noImg } from '../utils/constants'
import DetsNav from './DetsNav'

const PersonDets = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const PersonDets = useSelector(state => state.details.info)
    const fetchPersonDets = async () => {
        try {
            const endpoints = [
                `person/${id}?language=en-US`,
                `person/${id}/movie_credits?language=en-US`,
                `person/${id}/tv_credits?language=en-US&page=1`,
                `person/${id}/latest?language=en-US`,
                `person/${id}/changes?language=en-US&page=1`,
                `person/${id}/external_ids`
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => fetch(`https://api.themoviedb.org/3/${endpoint}`, API_OPTIONS))
            );

            const data = await Promise.all(responses.map(res => res.json()));

            const [
                details, movie_credits, tv_credits,
                latest, changes, external_ids
            ] = data;

            const resp = {
                details,
                movie_credits,
                tv_credits,
                latest,
                changes,
                external_ids
            }
            dispatch(addPersonDets(resp))
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchPersonDets()
        console.log('hey')
        return () => {
            dispatch(removePersonDets())
            console.log('byy')
        }
    }, [])
    console.log(PersonDets)
    return PersonDets ? (
        <div className='w-full bg-zinc-800 h-screen'>
            <DetsNav />
            <div className='max-w-screen-xl mx-auto h-[91%] '>
                <div className='h-[60%] gap-5 max-w-screen-xl mx-auto flex p-4'>
                    <div className='w-[17%] text-white'>
                        <div className='w-full relative'>
                            <img src={PersonDets.details.poster_path || PersonDets.details.backdrop_path || PersonDets.details.profile_path ? `https://image.tmdb.org/t/p/original${PersonDets.details.poster_path || PersonDets.details.backdrop_path || PersonDets.details.profile_path}'` : noImg} className='h-[300px] w-full  rounded-md object-cover' alt="" />
                            {PersonDets.details.popularity && <div className="absolute top-4 left-[-15px] bg-yellow-500 rounded-full h-[45px] z-50 flex justify-center items-center font-semibold  w-[45px]">{(PersonDets.details.popularity).toFixed(1)}<sup className='text-xs'>%</sup>
                            </div>}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <Link to={``}><i className="ri-facebook-fill text-2xl"></i></Link>
                            <Link to={``}><i className="ri-instagram-fill text-2xl"></i></Link>
                            <Link to={``}><i className="ri-twitter-fill text-2xl"></i></Link>
                            <Link to={``}><i className="ri-global-fill text-2xl"></i></Link>
                        </div>

                    </div>
                    <div className='w-[78%] text-white'>
                        <h2 className='text-5xl text-white font-black'>{PersonDets.details.name}</h2>
                        <div className="flex gap-3 items-center my-3">
                            <p className='text-sm leading-none'>{PersonDets.details.known_for_department}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm leading-none'>{PersonDets.details.gender === 2 ? 'Male' : 'Female'}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm leading-none'>{PersonDets.details.birthday}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm leading-none'>{PersonDets.details.place_of_birth}</p>

                        </div>
                        <p className='font-semibold mt-2'>Biography: </p>
                        <p className=' text-zinc-300 my-3'>{PersonDets.details.biography.slice(0, 1001)}.</p>
                    </div>
                </div>
                <h2 className='text-xl font-semibold px-4 text-white'>Known For: </h2>
                <FeedCards data={PersonDets.movie_credits.cast} title='movie' />
                {/* <div className=' w-full bg-red-50'>
                </div> */}
            </div>
        </div>
    ) : <Loader />
}

export default PersonDets