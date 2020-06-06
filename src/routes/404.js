import express from 'express'

const router = express.Router()

router.use((req, res) => {
  res.status(404).send({
    status: false,
    message: 'Oops sorry, endpoint not found.'
  })
})

export default router
