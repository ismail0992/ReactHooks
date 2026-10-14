function Filter({ title, onTitleChange, minimumRating, onRatingChange }) {
  return (
    <div className="filter-bar" aria-label="Filter movies">
      <label className="search-field"><span className="search-icon">⌕</span><span className="sr-only">Search by title</span><input value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="Search your collection..." /></label>
      <label className="rating-filter"><span>RATING</span><select value={minimumRating} onChange={(event) => onRatingChange(Number(event.target.value))} aria-label="Minimum rating">
        <option value={0}>All ratings</option><option value={3}>3.0+ stars</option><option value={4}>4.0+ stars</option><option value={4.5}>4.5+ stars</option>
      </select></label>
    </div>
  )
}

export default Filter
