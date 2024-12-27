import Express from 'express'
import { verifyToken, verifyTokenAndAuthorization } from './verifyToken.js' // Import corect

const router = Express.Router()

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  console.log('Request Body:', req.body)
  console.log('Request Params:', req.params)
  console.log('test')
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.secretKey
    ) // Adaugă `req.body.password`
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router
