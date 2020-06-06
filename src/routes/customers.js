import express from 'express'
import customersController from '../controllers/customersController'

const router = express.Router()

/* CUSTOMER ROUTES */
router.get('/', customersController.findAllCustomers)
router.post('/create', customersController.createCustomers)
router.put('/:id', customersController.updateCustomers)
router.delete('/:id', customersController.deleteCustomers)

export default router
