const devConfig = {
  MONGO_URL: 'mongodb://localhost/koa-watcher-server'
}

const testConfig = {
  MONGO_URL: 'mongodb://localhost/koa-watcher-server'
}

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/koa-watcher-server'
}

const defaultConfig = {
  PORT: process.env.PORT || 3030
}

function envConfig (env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'test':
      return testConfig
    default:
      return prodConfig
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
}
