// import dateFormat from 'dateformat'
import bcrypt from 'bcrypt'
import CustomersModel from '../models/customers'
import baseResponse from '../services/baseResponse'

/* GET ALL USERS */
const findAllCustomers = async (req, res) => {
  try {
    const data = await CustomersModel.findAll({
      order: [['id', 'DESC']]
    })
    res.status(200 || 201).json(
      baseResponse(
        {
          code: 200,
          response: 'Success',
          message: 'Get all customers successfully...'
        },
        data
      )
    )
  } catch (error) {
    res.status(500 || 400).json(
      baseResponse(
        {
          code: 500,
          response: 'Failed',
          message: 'Get all customer failed...'
        },
        []
      )
    )
  }
}

/* CREATE USER */
const createCustomers = async (req, res) => {
  const checkExistingCustomer = await CustomersModel.findOne({
    where: { email: req.body.email }
  })

  const saltRounds = 10
  const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds)

  const dataCustomer = {
    name: req.body.name,
    email: req.body.email,
    password: bcryptPassword,
    gender: req.body.gender,
    is_married: req.body.is_married,
    address: req.body.address
  }

  if (checkExistingCustomer === null) {
    try {
      const data = await CustomersModel.create(dataCustomer)
      res.status(201).json(
        baseResponse(
          {
            code: 201,
            response: 'Success',
            message: 'Create customer successfully...'
          },
          data
        )
      )
    } catch (error) {
      res.status(500 || 400).json(
        baseResponse(
          {
            code: 500,
            response: 'Failed',
            message: 'Create customer failed...'
          },
          []
        )
      )
    }
  } else {
    res.status(200 || 201).json(
      baseResponse(
        {
          code: 200,
          response: 'Failed',
          message: 'Data already exist...'
        },
        dataCustomer
      )
    )
  }
}

// UPDATE CUSTOMER BY EMAIL
const updateCustomers = async (req, res) => {
  const { id } = req.params
  const handlingUpdateCustomer = await CustomersModel.findOne({
    where: { id }
  })

  const saltRounds = 10
  const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds)

  const dataUpdateCustomer = {
    name: req.body.name,
    email: req.body.email,
    password: bcryptPassword,
    gender: req.body.gender,
    is_married: req.body.is_married,
    address: req.body.address
  }

  if (handlingUpdateCustomer !== null) {
    try {
      const data = await CustomersModel.update(dataUpdateCustomer, {
        where: { id }
      })
      console.log(data)
      res.status(201 || 200).json(
        baseResponse(
          {
            code: 201,
            response: 'Success',
            message: 'Update customer successfully...'
          },
          dataUpdateCustomer
        )
      )
    } catch (error) {
      res.status(500 || 400).json(
        baseResponse(
          {
            code: 500,
            response: 'Failed',
            message: 'Update customer failed...'
          },
          []
        )
      )
    }
  } else {
    res.status(500 || 400).json(
      baseResponse(
        {
          code: 500,
          response: 'Failed',
          message: 'Update customer failed...'
        },
        []
      )
    )
  }
}

// DELETE CUSTOMERS
const deleteCustomers = async (req, res) => {
  const { id } = req.params
  const handlingDeleteCustomer = await CustomersModel.findOne({
    where: { id }
  })
  console.log(handlingDeleteCustomer)
  if (handlingDeleteCustomer !== null) {
    try {
      const data = await CustomersModel.destroy({
        where: { id }
      })
      console.log(data)
      res.status(201 || 200).json(
        baseResponse(
          {
            code: 201,
            response: 'Success',
            message: 'Delete customer successfully...'
          },
          []
        )
      )
    } catch (error) {
      res.status(500 || 400).json(
        baseResponse(
          {
            code: 500,
            response: 'Failed',
            message: 'Delete customer failed...'
          },
          []
        )
      )
    }
  } else {
    res.status(500 || 400).json(
      baseResponse(
        {
          code: 500,
          response: 'Failed',
          message: 'Remove customer failed...'
        },
        []
      )
    )
  }
}

/* EXPORT FUNCTION TO BE USED IN A ROUTER  */
export default {
  findAllCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers
}
