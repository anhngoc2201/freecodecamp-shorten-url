let mongoose = require('mongoose')
let shortenUrlSchema = new mongoose.Schema({
  
  originalUrl: String
})
module.exports = mongoose.model('shortenUrl', shortenUrlSchema)