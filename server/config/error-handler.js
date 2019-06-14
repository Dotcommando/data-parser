export default async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      success: false,
      message: err.message
    }
  }
}
