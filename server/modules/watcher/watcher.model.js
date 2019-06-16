import mongoose, { Schema } from 'mongoose'
import config from '../../config/constants'

const len = config.threads
const dataSets = {}

const DataSet = new Schema({
  queryNumber: Number,
  set1: [String],
  set2: [String]
})

for (let i = 0; i < len; i++) {
  dataSets[`dataSet${i}`] = {
    type: DataSet,
    default: undefined
  }
}

const WatcherSchema = new Schema(dataSets, { timestamps: true })

export default mongoose.model('Watcher', WatcherSchema)
