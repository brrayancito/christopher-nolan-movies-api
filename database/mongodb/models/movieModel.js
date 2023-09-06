import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A movie must have a title']
  },
  director: {
    type: String,
    required: [true, 'A movie must have a director']
  },
  year: {
    type: Number,
    required: [true, 'A movie must have a realise year']
  },
  duration: {
    type: Number,
    required: [true, 'A movie must have a duration']
  },
  poster: {
    type: String,
    required: [true, 'A movie must have a poster']
  },
  genre: [],
  rate: {
    type: Number,
    min: 1,
    max: 10

  },
  createAt: {
    type: Date,
    default: Date.now(),
    select: false
  }

})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
