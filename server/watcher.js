import Koa from 'koa'
import middleware from './config/middleware'
import constants from './config/constants'
import pageWatcher from './config/page-watcher'
import apiRoutes from './modules'
import './config/database'

const app = new Koa()

middleware(app)
pageWatcher(app)
apiRoutes(app)

app.listen(constants.PORT, function () {
  console.log(`Koa Watcher Server is listening on port ${constants.PORT}.`)
})

export const watcherTimeout = app.timeout
