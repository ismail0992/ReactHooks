import { useEffect, useMemo, useState } from 'react'
import MovieList from './components/MovieList.jsx'
import Filter from './components/Filter.jsx'
import AddMovieForm from './components/AddMovieForm.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

const starterMovies = [
  { id: 'dune-part-two', title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w', posterURL: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', rating: 4.8 },
  { id: 'the-bear', title: 'The Bear', description: 'A young chef returns home to Chicago to run his family’s sandwich shop and discovers a team as complicated as the kitchen.', trailerUrl: 'https://www.youtube.com/embed/ojjCvICC86c', posterURL: 'https://image.tmdb.org/t/p/w500/9kwgN5FiJqQJ6GKhaLMNRakYzeG.jpg', rating: 4.6 },
  { id: 'everything-everywhere-all-at-once', title: 'Everything Everywhere All at Once', description: 'An exhausted laundromat owner is swept into an adventure across the multiverse, where only she can save every world.', trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g', posterURL: 'https://www.impawards.com/2022/posters/everything_everywhere_all_at_once_xxlg.jpg', rating: 4.7 },
  { id: 'the-last-of-us', title: 'The Last of Us', description: 'A hardened survivor and a teenage girl journey across a dangerous world and discover what hope can cost.', trailerUrl: 'https://www.youtube.com/embed/uLtkt8BonwM', posterURL: 'https://static.wikia.nocookie.net/thelastofus/images/3/37/The_Last_of_Us_Official_Key_Art.jpg/revision/latest/scale-to-width-down/1200?cb=20230220034629', rating: 4.5 },
  { id: 'spider-man-across-the-spider-verse', title: 'Spider-Man: Across the Spider-Verse', description: 'Miles Morales travels across the multiverse and meets a team of Spider-People protecting its very existence.', trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg', posterURL: 'https://cdn.marvel.com/content/2x/across_the_spider-verse.webp', rating: 4.9 },
  { id: 'wednesday', title: 'Wednesday', description: 'Wednesday Addams investigates a mystery at Nevermore Academy while navigating new friendships and old family secrets.', trailerUrl: 'https://www.youtube.com/embed/Di310WS8zLk', posterURL: 'https://www.thetrainline.com/cms/media/12092/wednesday-show-poster.jpg', rating: 4.2 },
]

function App() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = localStorage.getItem('reel-favorites')
      return savedMovies ? JSON.parse(savedMovies).map((movie) => {
        const id = movie.id || slugify(movie.title)
        const starterMovie = starterMovies.find((starter) => starter.id === id)
        return { ...movie, id, trailerUrl: movie.trailerUrl || starterMovie?.trailerUrl || '', posterURL: starterMovie?.posterURL || movie.posterURL }
      }) : starterMovies
    } catch {
      return starterMovies
    }
  })
  const [titleFilter, setTitleFilter] = useState('')
  const [minimumRating, setMinimumRating] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('reel-favorites', JSON.stringify(movies))
  }, [movies])

  const filteredMovies = useMemo(() => movies.filter((movie) =>
    movie.title.toLowerCase().includes(titleFilter.trim().toLowerCase()) &&
    movie.rating >= minimumRating
  ), [movies, titleFilter, minimumRating])

  function addMovie(movie) {
    setMovies((currentMovies) => [{ ...movie, id: slugify(movie.title) }, ...currentMovies])
    setIsFormOpen(false)
  }

  const home = (
    <div className="app-shell">
      <header className="topbar">
        <Link className="wordmark" to="/" aria-label="Reel favorites home"><span className="wordmark-icon">▶</span> reel<span className="wordmark-light">favorites</span></Link>
        <a className="topbar-link" href="#collection">My collection</a>
      </header>

      <main id="top">
        <section className="intro">
          <div className="intro-copy">
            <span className="overline"><span className="live-dot" /> YOUR PERSONAL WATCHLIST</span>
            <h1>Stories worth<br /><em>keeping.</em></h1>
            <p>A little home for the movies and shows you love.<br className="desktop-break" /> Add your favorites and find them again anytime.</p>
            <div className="intro-actions">
              <button className="add-button" onClick={() => setIsFormOpen(true)}><span>＋</span> Add a favorite</button>
              <span className="collection-count"><strong>{movies.length}</strong> titles saved</span>
            </div>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-ticket"><span>TONIGHT'S PICK</span><strong>Make it<br />a movie<br /><i>night.</i></strong><div className="ticket-stars">✦ &nbsp; ✧ &nbsp; ✦</div></div>
          </div>
          <div className="intro-foot"><span>01 / YOUR COLLECTION</span><span>GOOD STORIES STAY WITH US</span></div>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div><span className="overline muted-overline">THE ARCHIVE</span><h2>Your collection<span className="heading-period">.</span></h2></div>
            <span className="results-count">{filteredMovies.length} {filteredMovies.length === 1 ? 'TITLE' : 'TITLES'}</span>
          </div>
          <Filter title={titleFilter} onTitleChange={setTitleFilter} minimumRating={minimumRating} onRatingChange={setMinimumRating} />
          <MovieList movies={filteredMovies} onSelect={(movie) => navigate(`/movies/${movie.id}`)} />
        </section>
      </main>
      <footer><span className="wordmark small-wordmark">▶ reel<span className="wordmark-light">favorites</span></span><span>Made for the stories that stay.</span><span>YOUR NEXT REWATCH IS WAITING</span></footer>
      {isFormOpen && <AddMovieForm onAdd={addMovie} onClose={() => setIsFormOpen(false)} />}
    </div>
  )

  return <Routes><Route path="/" element={home} /><Route path="/movies/:movieId" element={<MovieDetails movies={movies} />} /><Route path="*" element={<main className="detail-page"><h1>Page not found</h1><Link className="back-link" to="/">← Back to collection</Link></main>} /></Routes>
}

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default App
