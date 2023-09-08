import Movie from '../database/mongodb/models/movieModel.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  // Get All Movies
  static async getAllMovies (req, res) {
    try {
      const movies = await Movie.find().select('-__v')
      res.json(movies)
    } catch (error) {
      res.json({ message: error.message })
    }
  }

  // Get Movie by ID
  static async getMovieById (req, res) {
    try {
      const { id } = req.params
      const movie = await Movie.findById(id).select('-__v')
      if (!movie) throw new Error('Movie not found')
      res.json(movie)
    } catch (error) {
      res.json({ message: error.message })
    }
  }

  // Create Movie
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
      res.status(404).json({
        status: 'fail',
        message: 'Something went wrong!'
      })
    }
  }

  // static async deleteMovie (req, res) {
  //   try {
  //     const { id } = req.params

  //     const isDeleted = await MovieModel.delete({ id })

  //     if (!isDeleted) return res.status(404).json({ message: 'Movie not found' })

  //     return res.status(200).json({ message: 'Movie deleted successfully' })
  //   } catch (error) {

  //   }
  // }

  static async updatedMovie (req, res) {
    try {
      const movieResult = validatePartialMovie(req.body)
      if (movieResult.error) throw new Error(movieResult.error.message)

      const { id } = req.params
      const updatedMovie = await Movie.findByIdAndUpdate(id, movieResult.data, { new: true })
      if (!updatedMovie) throw new Error('Movie not found')

      return res.status(200).json({
        message: 'Movie updated successfully',
        data: {
          updatedMovie
        }
      })
    } catch (error) {
      res.json(JSON.parse(error.message))
    }
  }
}
