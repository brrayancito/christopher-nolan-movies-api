import Express from 'express'
import cors from 'cors'

import moviesRouter from './routes/movie.routes.js'
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

// Routes
App.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

App.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 5000

App.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
