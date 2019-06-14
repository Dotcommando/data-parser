import koaCompress from 'koa-compress'
import koaHelmet from 'koa-helmet'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'
import errorHandler from './error-handler'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

export default app => {
  if (isProd) {
    app.use(koaCompress())
    app.use(koaHelmet())
  }

  app.use(errorHandler)
  app.use(
    cors({
      origin: [ 'http://localhost:3000', 'http://localhost:8008' ]
    })
  )
  app.use(bodyParser())

  if (isDev) {
    app.use(morgan('dev'))
  }
}
