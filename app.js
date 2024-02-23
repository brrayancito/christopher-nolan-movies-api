import Express from 'express'
import cors from 'cors'
import 'dotenv/config'

import moviesRouter from './routes/movie.routes.js'
import connectDB from './database/mongodb/connectdb.js'

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

// Home
App.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

// Movies
App.use('/api', moviesRouter)

// 404
App.use('*', (req, res) => {
  res.status(404).json({
    message: 'This route does not exist'
  })
})

async function startServer () {
  const PORT = process.env.PORT || 8080
  try {
    connectDB(process.env.MONGODB_URl)
    App.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
