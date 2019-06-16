const devConfig = {
  MONGO_URL: 'mongodb://localhost/data-parser'
}

const testConfig = {
  MONGO_URL: 'mongodb://localhost/data-parser'
}

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/data-parser'
}

const defaultConfig = {
  PORT: process.env.PORT || 3030,
  observableSelector: '.live.content .event'
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
