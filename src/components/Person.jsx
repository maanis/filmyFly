import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCards from './SkeletonCards';
import { useMediaQuery } from 'react-responsive';
import { toggleSidebar } from '../store/utils';

const Person = () => {
    const [Person, setPerson] = useState([])
    const dispatch = useDispatch()
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)
    const sidebar = useSelector(state => state.utils)
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const fetchPerson = async (pageNumber) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNumber}`, API_OPTIONS)
            const res = await data.json()
            if (res.results.length === 0) {
                sethasMore(false)
                return
            }
            setPerson(prev => [...prev, ...res.results])
            // setpage(page + 1)
        } catch (error) {
            consoleconsole.log(error)
        }
    }
    useEffect(() => {
        setPerson([]); // Clear previous data
        setpage(1);
        sethasMore(true);
        fetchPerson(1); // Fetch first page when category changes
    }, []);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        setpage(nextPage); // Update the page state
        fetchPerson(nextPage);
    };


    return Person.length > 0 ? (
        <>
            <div className="gradient w-[1px] top-0 bottom-0 fixed left-[5%] min-h-full max-md:left-0 bg-zinc-300"></div>
            <div className={`min-h-full w-[94%] relative left-[5%] max-md:left-0 max-md:w-full ${sidebar ? 'overflow-hidden' : ''}`}>
                {sidebar && <div onClick={() => dispatch(toggleSidebar(false))} className="fixed bottom-0 top-0 transition-all delay-300 h-full w-full bg-black/45 md:hidden z-[999]"></div>}

                <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                    <p className='text-2xl max-md:text-lg font-semibold'>Person</p>
                    {isMobile && <div onClick={() => dispatch(toggleSidebar(true))} className='text-2xl  max-md:text-[25px] md:hidden cursor-pointer text-zinc-950'><i class="ri-menu-2-line"></i></div>
                    }
                </div>
                <InfiniteScroll
                    dataLength={Person.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className='w-full text-center mb-2'>Loading...</h4>}
                    className='h-screen w-full'
                >
                    <Cards data={Person} title={'person'} />
                </InfiniteScroll>
            </div>
        </>
    ) : <SkeletonCards />
}

export default Person