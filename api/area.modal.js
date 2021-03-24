const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let contactlist = new Schema({
  area_Id: {
    type: String
  },
  area_Name: {
    type: String
  }
}
,{ strict: false }
,{
    collection: 'auidlist'
});

module.exports = mongoose.model('area', contactlist);