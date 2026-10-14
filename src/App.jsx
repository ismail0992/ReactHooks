import { useEffect, useMemo, useState } from 'react'
import MovieList from './components/MovieList.jsx'
import Filter from './components/Filter.jsx'
import AddMovieForm from './components/AddMovieForm.jsx'
import './App.css'

const starterMovies = [
  { title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', posterURL: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85', rating: 4.8 },
  { title: 'The Bear', description: 'A young chef returns home to Chicago to run his family’s sandwich shop and discovers a team as complicated as the kitchen.', posterURL: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85', rating: 4.6 },
  { title: 'Everything Everywhere All at Once', description: 'An exhausted laundromat owner is swept into an adventure across the multiverse, where only she can save every world.', posterURL: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=700&q=85', rating: 4.7 },
  { title: 'The Last of Us', description: 'A hardened survivor and a teenage girl journey across a dangerous world and discover what hope can cost.', posterURL: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85', rating: 4.5 },
  { title: 'Spider-Man: Across the Spider-Verse', description: 'Miles Morales travels across the multiverse and meets a team of Spider-People protecting its very existence.', posterURL: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=700&q=85', rating: 4.9 },
  { title: 'Wednesday', description: 'Wednesday Addams investigates a mystery at Nevermore Academy while navigating new friendships and old family secrets.', posterURL: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=700&q=85', rating: 4.2 },
]

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = localStorage.getItem('reel-favorites')
      return savedMovies ? JSON.parse(savedMovies) : starterMovies
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
    setMovies((currentMovies) => [movie, ...currentMovies])
    setIsFormOpen(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Reel favorites home"><span className="wordmark-icon">▶</span> reel<span className="wordmark-light">favorites</span></a>
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
          <MovieList movies={filteredMovies} />
        </section>
      </main>
      <footer><span className="wordmark small-wordmark">▶ reel<span className="wordmark-light">favorites</span></span><span>Made for the stories that stay.</span><span>YOUR NEXT REWATCH IS WAITING</span></footer>
      {isFormOpen && <AddMovieForm onAdd={addMovie} onClose={() => setIsFormOpen(false)} />}
    </div>
  )
}

export default App
