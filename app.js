const Express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./data/movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movie.js')

const App = Express()
App.use(Express.json())
App.disable('x-powered-by')
App.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

//  GET
App.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

App.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }

  res.json(movies)
})

App.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.find(movie => movie.id === id)
  if (!movie) return res.status(404).json({ message: 'Movie not found' })
  res.json(movie)
})

// POST
App.post('/movies', (req, res) => {
  const movieResult = validateMovie(req.body)

  if (movieResult.error) return res.status(400).json({ error: JSON.parse(movieResult.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...movieResult.data
  }

  movies.push(newMovie)

  res.status(201).json({
    status: 'success',
    message: 'Movie created successfully',
    data: {
      newMovie
    }
  })
})

// PATCH
App.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex < 0) return res.status(404).json({ message: 'Movie not found' })

  const movieResult = validatePartialMovie(req.body)
  if (movieResult.error) return res.status(400).json({ error: JSON.parse(movieResult.error.message) })

  const updatedMovie = {
    ...movies[movieIndex],
    ...movieResult.data
  }

  movies[movieIndex] = updatedMovie

  return res.status(200).json(updatedMovie)
})

const PORT = process.env.PORT ?? 5000

App.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
