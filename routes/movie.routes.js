import { Router } from 'express'
import { MovieController } from '../controllers/movieController.js'

const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAllMovies)
moviesRouter.post('/', MovieController.createMovie)

moviesRouter.get('/:id', MovieController.getMovieById)
moviesRouter.delete('/:id', MovieController.deleteMovie)
moviesRouter.patch('/:id', MovieController.updatedMovie)

export default moviesRouter
