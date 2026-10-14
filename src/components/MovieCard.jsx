import { useState } from 'react'

function MovieCard({ movie }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="movie-card">
      <div className={`poster-wrap${imageFailed ? ' poster-fallback' : ''}`}>
        {!imageFailed ? <img className="poster" src={movie.posterURL} alt={`${movie.title} poster`} onError={() => setImageFailed(true)} /> : <div className="poster-placeholder"><span>▶</span><strong>{movie.title}</strong></div>}
        <span className="rating-badge"><span>★</span> {Number(movie.rating).toFixed(1)}</span>
      </div>
      <div className="movie-info"><h3>{movie.title}</h3><p>{movie.description}</p></div>
    </article>
  )
}

export default MovieCard
