import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const FeedCards = () => {
  const { feedItems } = useSelector(state => state.movies)
  if (!feedItems) return
  return (
    <div className='w-full flex gap-3 overflow-x-auto  h-[28%] px-3 py-2'>
      {feedItems.map((d, i) => (
        <Link to={`/${d.media_type}/${d.id}`} key={i} style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),url('https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className={`w-[10%] transition-all relative rounded-md cursor-pointer h-full shrink-0`}>
          <h2 className='text-xs font-semibold absolute bottom-4 left-3 text-white'>{d.title || d.name || d.original_name}</h2>
        </Link>)
      )}
    </div>
  )
}

export default FeedCards