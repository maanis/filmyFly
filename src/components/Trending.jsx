import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import { addTrending } from '../store/movieSlice'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCards from './SkeletonCards';
import { useMediaQuery } from 'react-responsive';
import { toggleSidebar } from '../store/utils';

const Trending = () => {
    const [trending, settrending] = useState([])
    const [category, setcategory] = useState('all')
    const dispatch = useDispatch()
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)
    const sidebar = useSelector(state => state.utils)
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const fetchTrending = async (pageNumber) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/${category}/day?language=en-US&page=${pageNumber}`, API_OPTIONS)
            const res = await data.json()
            if (res.results.length === 0) {
                sethasMore(false)
                return
            }
            settrending(prev => [...prev, ...res.results])
            // setpage(page + 1)
        } catch (error) {
            consoleconsole.log(error)
        }
    }
    useEffect(() => {
        settrending([]); // Clear previous data
        setpage(1);
        sethasMore(true);
        fetchTrending(1); // Fetch first page when category changes
    }, [category]);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        setpage(nextPage); // Update the page state
        fetchTrending(nextPage);
    };


    return trending.length > 0 ? (
        <>
            <div className="gradient w-[1px] top-0 bottom-0 fixed left-[5%] max-md:left-0 min-h-full bg-zinc-300"></div>
            <div className={`min-h-full w-[94%] relative left-[5%] max-md:left-0 max-md:w-full ${sidebar ? 'overflow-hidden' : ''}`}>
                {sidebar && <div onClick={() => dispatch(toggleSidebar(false))} className="fixed bottom-0 top-0 transition-all delay-300 h-full w-full bg-black/45 md:hidden z-[999]"></div>}

                <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                    <p className='text-2xl max-md:text-lg font-semibold'>Trending <small className='text-sm max-md:text-xs text-zinc-600'>({category})</small></p>
                    {!isMobile && <Dropdown options={['all', 'movie', 'tv']} method={setcategory} />}
                    {isMobile && <div onClick={() => dispatch(toggleSidebar(true))} className='text-2xl  max-md:text-[25px] md:hidden cursor-pointer text-zinc-950'><i class="ri-menu-2-line"></i></div>
                    }
                </div>
                <div className="flex md:hidden justify-self-end px-4 mt-3"><Dropdown options={['all', 'movie', 'tv']} method={setcategory} /></div>
                <InfiniteScroll
                    dataLength={trending.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className='w-full text-center mb-2'>Loading...</h4>}
                    className='h-screen w-full'
                >
                    <Cards data={trending} title={category} />
                </InfiniteScroll>
            </div>
        </>
    ) : <SkeletonCards />
}

export default Trending