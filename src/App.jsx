import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef } from 'react'

function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstSearch = useRef(true)

  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = search === ''
      return
    }

    if (search === '') {
      setError('You have to write something')
      return
    }

    if (search.length < 3) {
      setError('Write at least three char')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

export function App () {
  const [sort, setSort] = useState(false)

  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>

      <header>
        <h1>Movie searcher</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type='text' />
          <button>Search movie</button>
          <input type='checkbox' onChange={handleSort} checked={sort} />
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}
