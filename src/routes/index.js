import express from 'express'

const router = express.Router()

/* GET HOME PAGE */
router.get('/', (req, res) => {
  res.status(200).send({
    status: true,
    message: 'Welcome to the thefthing project'
  })
})

export default router
