import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster URL is invalid'

  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Fantasy',
      'Terror', 'Crime', 'Mystery', 'History', 'Biography']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre is invalid'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

export {
  validateMovie,
  validatePartialMovie
}
