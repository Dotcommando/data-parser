import mongoose from 'mongoose'
import constants from './constants'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

try {
  mongoose.connect(constants.MONGO_URL)
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL)
}

mongoose.connection
  .once('open', () => console.log('\x1b[36m%s\x1b[0m', 'MongoDB is running.'))
  .on('error', err => {
    throw err
  })
