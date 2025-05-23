import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { noImg } from '../utils/constants'

const FeedCards = ({ data, title = '' }) => {
  if (!data) return
  return data.length > 0 ? (
    <div className={`w-full max-md:relative ${title === '' && 'max-md:top-[65%]'}  flex ${title != 'season' && 'max-md:flex-wrap max-md:justify-center'} ${title === 'season' && 'overflow-y-auto w-full  relative h-[30%]'}  gap-3 min-md:overflow-x-auto   h-[28%] px-3 py-2`}>
      {data.map((d, i) => (
        <Link to={`${title != 'season' && `/${d.media_type || title}/${d.id}`}`} key={i} style={{
          backgroundImage: d.poster_path || d.backdrop_path || d.profile_path ? `linear-gradient(to top, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),url('https://image.tmdb.org/t/p/original${d.poster_path || d.backdrop_path || d.profile_path}')` : `linear-gradient(to top, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),url(${noImg})`
          ,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className={`w-[9rem] max-[768px]:w-[10rem] max-[640px]:w-[8rem] max-[432px]:w-[10rem] ${title != 'tv' && title != 'season' && 'max-[432px]:h-[108%]'} min-[976px]:w-[8rem] transition-all relative rounded-md cursor-pointer h-full shrink-0`}>
          <h2 className='text-xs font-semibold absolute bottom-4 left-3 text-white'>{d.title || d.name || d.original_name}</h2>
        </Link>)
      )}
    </div>
  ) : <h2 className='text-zinc-500 px-3'>Nothing to show...</h2>
}

export default FeedCards