import Movie from '../database/mongodb/models/movieModel.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  //
  static async getAllMovies (req, res) {
    try {
      const movies = await Movie.find().select('-__v')
      res.json(movies)
    } catch (error) {
      res.json({ message: error.message })
    }
  }

  // static async getMovieById (req, res) {
  //   const { id } = req.params
  //   const movie = await MovieModel.getById({ id })
  //   if (!movie) return res.status(404).json({ message: 'Movie not found' })
  //   res.json(movie)
  // }

  static async createMovie (req, res) {
    try {
      const movieResult = validateMovie(req.body)

      if (movieResult.error) return res.status(400).json({ error: JSON.parse(movieResult.error.message) })

      const newMovie = await Movie.create(movieResult.data)

      res.status(201).json({
        status: 'success',
        message: 'Movie created successfully',
        data: {
          newMovie
        }
      })
    } catch (error) {
      res.status(201).json({
        status: 'fail',
        message: 'Something went wrong!'
      })
    }
  }

  // static async deleteMovie (req, res) {
  //   const { id } = req.params

  //   const isDeleted = await MovieModel.delete({ id })

  //   if (!isDeleted) return res.status(404).json({ message: 'Movie not found' })

  //   return res.status(200).json({ message: 'Movie deleted successfully' })
  // }

  // static async updatedMovie (req, res) {
  //   const movieResult = validatePartialMovie(req.body)
  //   if (movieResult.error) return res.status(400).json({ error: JSON.parse(movieResult.error.message) })

  //   const { id } = req.params
  //   const updatedMovie = await MovieModel.update({ id, data: movieResult.data })
  //   if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' })

  //   return res.status(200).json({
  //     message: 'Movie updated successfully',
  //     data: {
  //       updatedMovie
  //     }
  //   })
  // }
}
