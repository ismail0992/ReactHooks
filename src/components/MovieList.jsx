import MovieCard from './MovieCard.jsx'

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <div className="empty-state"><span>⌕</span><h3>No stories found</h3><p>Try another title or lower the rating filter.</p></div>
  }

  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={`${movie.title}-${movie.posterURL}`} movie={movie} />)}</div>
}

export default MovieList
