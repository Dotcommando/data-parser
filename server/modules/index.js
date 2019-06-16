import watcherRouter from '../models/watcher.routes'

export default app => {
  app.use(watcherRouter.routes())
  app.use(watcherRouter.allowedMethods())
}
