const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

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
// There are some sample data if u use:
// article{Janzen:2008fx,
// author = {{Janzen, D S} and {Saiedian, H}},
// title = {{Does Test-Driven Development Really Improve Software Design Quality?}},
// journal = {Software, IEEE},
// year = {2008},
// volume = {25},
// number = {2},
// pages = {77--84}
// }
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//What's the delete returnedObject.__v mean?
module.exports = mongoose.model('Note', noteSchema)
