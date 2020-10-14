const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)
// url example:mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
// How about using sql server to create entities relationship database?
// When there is a lot of content, is the minimum length 5 not enough?
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  accept: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
