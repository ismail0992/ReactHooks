import { useState } from 'react'

const emptyMovie = { title: '', description: '', trailerUrl: '', posterURL: '', rating: '4.0' }

function AddMovieForm({ onAdd, onClose }) {
  const [movie, setMovie] = useState(emptyMovie)

  function handleSubmit(event) {
    event.preventDefault()
    onAdd({ ...movie, title: movie.title.trim(), description: movie.description.trim(), rating: Number(movie.rating) })
  }

  function updateField(event) {
    setMovie((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="movie-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <button className="modal-close" onClick={onClose} aria-label="Close form">×</button>
        <span className="overline muted-overline">GROW YOUR ARCHIVE</span>
        <h2 id="form-title">Add a favorite<span className="heading-period">.</span></h2>
        <p className="modal-description">Save a movie or show you want to remember.</p>
        <form onSubmit={handleSubmit}>
          <label>Title<input name="title" value={movie.title} onChange={updateField} placeholder="e.g. The Grand Budapest Hotel" required maxLength={80} /></label>
          <label>Description<textarea name="description" value={movie.description} onChange={updateField} placeholder="What makes this one special?" required rows={3} maxLength={240} /></label>
          <label>Trailer embed URL<input name="trailerUrl" type="url" value={movie.trailerUrl} onChange={updateField} placeholder="https://www.youtube.com/embed/..." /></label>
          <label>Poster image URL<input name="posterURL" type="url" value={movie.posterURL} onChange={updateField} placeholder="https://..." required /></label>
          <label>Rating <span className="form-hint">from 0 to 5 stars</span><input name="rating" type="number" value={movie.rating} onChange={updateField} min="0" max="5" step="0.1" required /></label>
          <button className="add-button submit-button" type="submit">Save to my collection <span>→</span></button>
        </form>
      </section>
    </div>
  )
}

export default AddMovieForm
