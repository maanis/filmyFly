import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import API_OPTIONS from '../utils/ApiOptions'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCards from './SkeletonCards';

const Person = () => {
    const [Person, setPerson] = useState([])
    const dispatch = useDispatch()
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)
    const fetchPerson = async (pageNumber) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNumber}`, API_OPTIONS)
            const res = await data.json()
            console.log(res)
            if (res.results.length === 0) {
                sethasMore(false)
                return
            }
            setPerson(prev => [...prev, ...res.results])
            // setpage(page + 1)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log("Category changed, resetting data...");
        setPerson([]); // Clear previous data
        setpage(1);
        sethasMore(true);
        fetchPerson(1); // Fetch first page when category changes
    }, []);

    const fetchMoreData = () => {
        console.log("Fetching More Data...");
        const nextPage = page + 1;
        setpage(nextPage); // Update the page state
        fetchPerson(nextPage);
    };

    console.log(Person)

    return Person.length > 0 ? (
        <>
            <div className="gradient w-[1px] top-0 bottom-0 fixed left-[5%] min-h-full bg-zinc-300"></div>
            <div className='min-h-full w-[94%] relative left-[5%]'>

                <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                    <p className='text-2xl font-semibold'>Person</p>
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