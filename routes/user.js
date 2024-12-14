import Express from 'express'
const router = Express.Router()

router.get('/usertest', (req, res) => {
  res.send('user test is succesful')
})

router.post('/userposttest', (req, res) => {
  const username = req.body.username
  res.send('Your user name is ' + username)
  console.log(username)
})

export default router
