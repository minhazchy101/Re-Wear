import mongoose from "mongoose"

const clotheSchema = mongoose.Schema({

title  : { type : String, require : true},
description  : { type : String, require : true},
category  : { type : String, require : true, enum: ["Men", "Women", "Kids"],},
size  : { type : String, require : true, enum: [ "S", "M", "L", "XL", "XXL"],},
condition  : { type : String, require : true,  enum: [
    "New with tags",
    "New without tags",
    "Gently used",
    "Used",
    "Well worn"
  ]},
price: {
  type: Number,
  required: true,
  default: 0,
  min: 0
},

isFree: {
  type: Boolean,
  required: true,
  default: true
},

currency: {
  type: String,
  required: true,
  enum: ["BDT", "PKR", "USD", "SAR", "OTHER"],
  default: "BDT"
},

customCurrency: {
  type: String,
  maxlength: 10,
  required: function () {
    return this.currency === "OTHER"
  }
},


images  : { type : String, require : true},
location  : { type : String, require : true},
contactNumber  : { type : Number, require : true},
status  : { type : String, require : true, default : "Available"},
postedBy  : {type : mongoose.Types.ObjectId, ref : 'user'},
like : [{type : mongoose.Types.ObjectId, ref : 'user'}],
   
})

const Clothe = mongoose.model('clothe', clotheSchema)
export default Clothe ;