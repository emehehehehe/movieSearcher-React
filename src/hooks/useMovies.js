import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movies, setMovies] = useState([])
  const previousSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      if (search === previousSearch.current) return

      try {
        setLoading(true)
        setError(null)
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, [])

  console.log('render')

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
