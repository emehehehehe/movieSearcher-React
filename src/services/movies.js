const API_KEY = 'e066e688'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const data = await response.json()

    const movies = data.Search
    return movies?.map(movie => ({
      id: movie.imdbID,
      date: movie.Year,
      poster: movie.Poster,
      title: movie.Title
    }))
  } catch (err) {
    throw new Error('Its an error searching movies')
  }
}
