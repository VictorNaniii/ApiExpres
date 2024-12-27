import express from 'express'
import User from '../models/user.js'
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!process.env.secretKey) {
    return res.status(500).json('Secret key is not configured!')
  }

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.secretKey
    ).toString()
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json('Please provide both username and password')
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json('Wrong credentials')
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.secretKey
    )
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    if (OriginalPassword !== password) {
      return res.status(401).json('Wrong credentials')
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json('JWT secret key is not configured!')
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' }
    )

    res
      .status(200)
      .json({ username: user.username, email: user.email, accessToken })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

export default router
