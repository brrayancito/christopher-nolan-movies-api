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
App.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

App.use('/movies', moviesRouter)

async function startServer () {
  const PORT = process.env.PORT || 8080
  try {
    connectDB(process.env.MONGODB_URl)
    App.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
