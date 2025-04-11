const mongoose = require('mongoose');
 
const moneySchema = new mongoose.Schema({
  name: String,
  email: String
  // ...
});
 
module.exports = mongoose.model('Money', moneySchema);