function MovieList ({ movies }) {
  return (
    <ul className='mv-list-grid'>
      {movies.map(movie => (
        <li className='mv-element' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.date}</p>
          <img src={movie.poster} alt='Poster' />
        </li>
      ))}
    </ul>
  )
}

function NoMovie ({ movies }) {
  return (
    <p>{movies.Error}</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <MovieList movies={movies} />
      : <NoMovie movies={movies} />
  )
}
