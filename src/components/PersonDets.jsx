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
    const [PersonDets, setPersonDets] = useState(null)
    // const PersonDets = useSelector(state => state.details.info)
    const fetchPersonDets = async () => {
        try {
            const endpoints = [
                `person/${id}?language=en-US`,
                `person/${id}/movie_credits?language=en-US`,
                `person/${id}/external_ids`
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => fetch(`https://api.themoviedb.org/3/${endpoint}`, API_OPTIONS))
            );

            const data = await Promise.all(responses.map(res => res.json()));

            const [
                details, movie_credits, external_ids
            ] = data;

            const resp = {
                details,
                movie_credits,
                external_ids
            }
            setPersonDets(resp)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchPersonDets()
        console.log('hey')
        return () => {
            setPersonDets(null)
            console.log('byy')
        }
    }, [id])

    console.log(PersonDets)
    return PersonDets ? (
        <div className='w-full bg-zinc-800 h-screen overflow-y-auto'>
            <DetsNav />
            <div className='max-w-screen-xl mx-auto h-[91%] '>
                <div className='md:h-[60%] gap-5 max-w-screen-xl mx-auto flex max-[728px]:flex-col max-[728px]:items-center p-4'>
                    <div className='w-[22%] max-[1066px]:w-[19%] max-[768px]:w-[32%] max-[728px]:w-[14rem] text-white'>
                        <div className='w-full relative'>
                            <img src={PersonDets.details.poster_path || PersonDets.details.backdrop_path || PersonDets.details.profile_path ? `https://image.tmdb.org/t/p/original${PersonDets.details.poster_path || PersonDets.details.backdrop_path || PersonDets.details.profile_path}'` : noImg} className='h-[300px] w-full  rounded-md object-cover' alt="" />
                            {PersonDets.details.popularity && <div className="absolute top-4 left-[-15px] bg-yellow-500 rounded-full h-[45px] z-50 flex justify-center items-center font-semibold  w-[45px]">{(PersonDets.details.popularity).toFixed(1)}<sup className='text-xs'>%</sup>
                            </div>}
                        </div>
                        <div className="gradient h-0.5 mt-4 w-full bg-zinc-500"></div>

                        <div className="flex justify-between items-center mt-3">
                            <a target='_blank' href={`https://www.facebook.com/${PersonDets.external_ids.facebook_id}/`}><i className="ri-facebook-fill text-2xl"></i></a>
                            <a target='_blank' href={`https://www.instagram.com/${PersonDets.external_ids.instagram_id}/`}><i className="ri-instagram-fill text-2xl"></i></a>
                            <a target='_blank' href={`https://www.twitter.com/${PersonDets.external_ids.twitter_id}/`}><i className="ri-twitter-fill text-2xl"></i></a>
                            <a target='_blank' href={`https://www.imdb.com/name/${PersonDets.external_ids.imdb_id}/`}><i className="ri-global-fill text-2xl"></i></a>
                        </div>

                    </div>
                    <div className='w-[78%] text-white'>
                        <h2 className='text-5xl max-[722px]:text-3xl max-[722px]:text-center text-white font-black'>{PersonDets.details.name}</h2>
                        <div className="flex gap-3 items-center my-3 max-[722px]:justify-center ">
                            <p className='text-sm max-[566px]:text-xs max-[507px]:text-[8px] leading-none'>{PersonDets.details.known_for_department}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm max-[566px]:text-xs max-[507px]:text-[8px] leading-none'>{PersonDets.details.gender === 2 ? 'Male' : 'Female'}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm max-[566px]:text-xs max-[507px]:text-[8px] leading-none'>{PersonDets.details.birthday}</p>
                            <span className='h-1 w-1 rounded-full bg-white inline-block'></span>
                            <p className='text-sm max-[566px]:text-xs max-[507px]:text-[8px] leading-none'>{PersonDets.details.place_of_birth}</p>

                        </div>
                        <p className='font-semibold mt-2'>Biography: </p>
                        <p className=' text-zinc-300 max-[566px]:text-xs my-3'>{PersonDets.details.biography.slice(0, 1001)}.</p>
                    </div>
                </div>
                <h2 className='text-xl font-semibold px-4 text-white'>Known For: </h2>
                <FeedCards data={PersonDets.movie_credits.cast} title='movie' />

            </div>
        </div>
    ) : <Loader />
}

export default PersonDets