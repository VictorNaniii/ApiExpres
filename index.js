import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoute from './routes/auth.js'
dotenv.config()

import userRoutes from './routes/user.js'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connection successful'))
  .catch((error) => {
    console.error('DB connection failed:', error)
  })

const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use('/api/auth', authRoute)

app.use('/users', userRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log('Server runing')
})
