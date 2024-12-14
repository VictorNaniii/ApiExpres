import express from 'express'

import User from '../models/user.js'
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
const router = express.Router()
dotenv.config()

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const newUser = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.secretKey),
    })

    const savedUser = await newUser.save()
    console.log(savedUser)
    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error saving user:', error.message)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

///LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(401).json('Wrong credentials') // Trimite răspunsul și oprește execuția
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.secretKey
    )
    const password = hashedPassword.toString(CryptoJS.enc.Utf8)

    if (password !== req.body.password) {
      return res.status(401).json('Wrong credentials!') // Trimite răspunsul și oprește execuția
    }

    res.status(200).json(user) // Trimite răspunsul doar dacă nu sunt erori
  } catch (error) {
    res.status(500).json(error) // Trimite răspunsul de eroare în caz de excepție
  }
})

export default router
