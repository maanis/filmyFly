import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import API_OPTIONS from '../utils/ApiOptions';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loader from './Loader';

const Trending = () => {
    const [trending, setTrending] = useState([]);
    const [category, setCategory] = useState('all');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(4);

    const fetchTrending = async (pageNumber) => {
        try {
            console.log(`Fetching Page: ${pageNumber}, Category: ${category}`); // Debugging Log

            const response = await fetch(
                `https://api.themoviedb.org/3/trending/${category}/day?language=en-US&page=${pageNumber}`,
                API_OPTIONS
            );
            const res = await response.json();

            if (!res.results || res.results.length === 0) {
                setHasMore(false); // No more data to fetch
                return;
            }

            setTrending((prev) => [...prev, ...res.results]);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        console.log("Category changed, resetting data...");
        setTrending([]); // Clear previous data
        setPage(1);
        setHasMore(true);
        fetchTrending(1); // Fetch first page when category changes
    }, [category]);

    // const fetchMoreData = async () => {
    //     const nextPage = page + 1;
    //     console.log(`Fetching More Data... Page: ${nextPage}`);

    //     try {
    //         const response = await fetch(
    //             `https://api.themoviedb.org/3/trending/${category}/day?language=en-US&page=${nextPage}`,
    //             API_OPTIONS
    //         );
    //         const res = await response.json();

    //         if (!res.results || res.results.length === 0) {
    //             setHasMore(false); // Stop fetching if no more results
    //             return;
    //         }

    //         setTrending((prev) => [...prev, ...res.results]);
    //         setPage(nextPage); // Update page AFTER fetching data
    //     } catch (error) {
    //         console.error('Error fetching more data:', error);
    //         setHasMore(false);
    //     }
    // };
    const fetchMoreData = () => {
        console.log("Fetching More Data, Current Page:", page); // Debugging
        setPage(prevPage => prevPage + 1);
    };



    return (
        <div className='min-h-screen w-full overflow-y-auto'>
            <div className="nav w-full h-[9%] shadow-lg flex justify-between items-center px-4">
                <p className='text-2xl font-semibold'>Trending</p>
                <Dropdown options={['all', 'movie', 'tv']} method={setCategory} />
            </div>
            <InfiniteScroll
                dataLength={trending.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className='w-full text-center mb-2'>Loading...</h4>}
                scrollableTarget="scrollableDiv" // 🔥 Important fix
            >
                <div id="scrollableDiv">
                    <Cards data={trending} />
                </div>
            </InfiniteScroll>

        </div>
    );
};

export default Trending;
