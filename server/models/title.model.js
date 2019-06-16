import mongoose, { Schema } from 'mongoose'

const TitleSchema = new Schema({
  date: String,
  name1: [String],
  name2: [String],
  number: Number
})

export default mongoose.model('Title', TitleSchema)
