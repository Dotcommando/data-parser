import Router from 'koa-router'
import * as watcherController from './watcher.controller'

const basePath = '/api/watcher'
const router = new Router()

router.post(
  basePath + '/start',
  watcherController.start
)

router.delete(
  basePath + '/stop',
  watcherController.stop
)

export default router
