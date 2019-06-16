import mongoose, { Schema } from 'mongoose'

const DataSetSchema = new Schema({
  queryNumber: Number,
  set1: [String],
  set2: [String]
})

export default mongoose.model('DataSet', DataSetSchema)
