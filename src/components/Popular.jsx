import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux';

const Popular = () => {
    const [Popular, setPopular] = useState([])
    const dispatch = useDispatch()
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)
    const fetchPopular = async (pageNumber) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`, API_OPTIONS)
            const res = await data.json()
            if (res.results.length === 0) {
                sethasMore(false)
                return
            }
            setPopular(prev => [...prev, ...res.results])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setPopular([]);
        setpage(1);
        sethasMore(true);
        fetchPopular(1);
    }, []);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        setpage(nextPage); // Update the page state
        fetchPopular(nextPage);
    };


    return Popular.length > 0 ? (
        <>
            <div className="gradient w-[1px] top-0 bottom-0 fixed left-[5%] min-h-full bg-zinc-300"></div>
            <div className='min-h-full w-[94%] relative left-[5%]'>

                <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                    <p className='text-2xl font-semibold'>Popular</p>
                </div>
                <InfiniteScroll
                    dataLength={Popular.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className='w-full text-center mb-2'>Loading...</h4>}
                    className='h-screen w-full'
                >
                    <Cards data={Popular} title={'movie'} />
                </InfiniteScroll>
            </div>
        </>
    ) : <Loader />
}

export default Popular