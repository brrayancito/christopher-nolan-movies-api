import { Router } from 'express'
import { MovieController } from '../controllers/movieController.js'

const moviesRouter = Router()

moviesRouter.get('/movies', MovieController.getAllMovies)
moviesRouter.post('/movies', MovieController.createMovie)

moviesRouter.get('/movies/:id', MovieController.getMovieById)
moviesRouter.delete('/movies/:id', MovieController.deleteMovie)
moviesRouter.patch('/movies/:id', MovieController.updatedMovie)

moviesRouter.get('/top-5-movies', MovieController.getTopFiveMovies)

export default moviesRouter
