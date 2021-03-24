const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let chOfAcc = new Schema({
  id: {
    type: String 
  },
  name: {
    type: String
  },
  Child: {
    type: Array
  }
  

}
,{ strict: false }
,{
    collection: 'acclist'
});

module.exports = mongoose.model('account', chOfAcc);