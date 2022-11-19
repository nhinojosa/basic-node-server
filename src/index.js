import './utils/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import basicAuth from 'express-basic-auth'

import logger from './utils/logger'
import router from './routes'
import { notFound, errorHandler } from './utils/errors'

const port = Number(process.env.PORT)

const app = express()
app.use(cors())

app.use(
  basicAuth({
    users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
  }),
)
app.use(morgan(process.env.MORGAN_LOG))

app.use(bodyParser.json())

app.use('/', router)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
