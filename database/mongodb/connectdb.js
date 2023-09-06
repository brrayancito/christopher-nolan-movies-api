import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
