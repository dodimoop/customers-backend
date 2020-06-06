/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import bodyParser from 'body-parser'

// DATABASE
import database from './src/database/database'

/* IMPORT FROM ROUTES */
import IndexRouter from './src/routes'
import CustomersRouter from './src/routes/customers'
import NotFound from './src/routes/404'

database
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(`Error: ${err}`))

const app = express()

config()

// CORS HANDLE
// const corsOptions = {
//   origin: process.env.THEFTHING_CORS_ALLOW_FROMS,
//   optionsSuccessStatus: 200 // Some Legacy Browsers (IE11, various SmartTVs) Choke On 204
// }
// app.use(cors(corsOptions))

app.use(cors())

app.use(bodyParser.json())

/* USE ROUTES */
app.use('/', IndexRouter)
app.use('/api/v1/customers', CustomersRouter)
app.use(NotFound)

app.listen(process.env.PORT || 5000)
