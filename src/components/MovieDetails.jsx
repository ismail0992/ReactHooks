import { Link, useParams } from 'react-router-dom'

function MovieDetails({ movies }) {
  const { movieId } = useParams()
  const movie = movies.find((item) => item.id === movieId)

  if (!movie) {
    return <main className="detail-page"><Link className="back-link" to="/">← Back to collection</Link><h1>Movie not found</h1><p>It may have been removed from your collection.</p></main>
  }

  return (
    <div className="app-shell">
      <header className="topbar"><Link className="wordmark" to="/"><span className="wordmark-icon">▶</span> reel<span className="wordmark-light">favorites</span></Link><Link className="topbar-link" to="/#collection">My collection</Link></header>
      <main className="detail-page">
        <Link className="back-link" to="/">← Back to home</Link>
        <div className="detail-layout">
          <img className="detail-poster" src={movie.posterURL} alt={`${movie.title} poster`} />
          <section className="detail-copy">
            <span className="overline muted-overline">YOUR COLLECTION · ★ {Number(movie.rating).toFixed(1)}</span>
            <h1>{movie.title}<span className="heading-period">.</span></h1>
            <h2>About this story</h2>
            <p>{movie.description}</p>
            <h2 className="trailer-heading">Watch the trailer</h2>
            {movie.trailerUrl ? <div className="trailer-frame"><iframe src={movie.trailerUrl} title={`${movie.title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div> : <p className="no-trailer">No trailer added yet. Add an embed link when you edit this movie.</p>}
          </section>
        </div>
      </main>
      <footer><span className="wordmark small-wordmark">▶ reel<span className="wordmark-light">favorites</span></span><span>Made for the stories that stay.</span><span>YOUR NEXT REWATCH IS WAITING</span></footer>
    </div>
  )
}

export default MovieDetails
