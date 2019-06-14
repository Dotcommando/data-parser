import HTTPStatus from 'http-status'
import { watcherTimeout } from '../../watcher'

/**
 * Запуск слежения за страницой.
 * @param ctx - контекст запроса Koa.
 * @param next
 * @returns {Promise<*>}
 */
export async function start (ctx, next) {
  try {
    watcherTimeout.settings = {
      interval: ctx.request.query.interval,
      status: 'start'
    }
    ctx.status = HTTPStatus.OK
    ctx.body = {
      interval: watcherTimeout.settings.interval,
      status: watcherTimeout.settings.status
    }
    return next()
  } catch (err) {
    ctx.status = err.status || HTTPStatus.BAD_REQUEST
    ctx.body = { message: err.message }
    return next()
  }
}

/**
 * Остановка слежения за страницой.
 * @param ctx - контекст запроса Koa.
 * @param next
 * @returns {Promise<*>}
 */
export async function stop (ctx, next) {
  try {
    watcherTimeout.settings = {
      interval: null,
      status: 'stop'
    }
    ctx.status = HTTPStatus.OK
    ctx.body = {
      interval: watcherTimeout.settings.interval,
      status: watcherTimeout.settings.status
    }
    return next()
  } catch (err) {
    ctx.status = err.status || HTTPStatus.BAD_REQUEST
    ctx.body = { message: err.message }
    return next()
  }
}
