const { Schema, model} = require("mongoose");

const AnnouncementSchema =  new Schema ( {
  name: {
    type: String,
  },
  sale: {
    type: Boolean,
  }, 
  price: {
    type: Number,
  }, 
  photo: {
    type: String,
  },
  tags: [String], 
  
}); 

module.exports = model ( "Announcement", AnnouncementSchema); 