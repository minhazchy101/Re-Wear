import mongoose from "mongoose"

const clotheSchema = mongoose.Schema({

title  : { type : String, require : true},
giverName  : { type : String, require : true},
giverEmail  : { type : String, require : true},
giverId  : { type : String, require : true},
description  : { type : String, require : true},
category  : { type : String, require : true, enum: ["Boy", "Girl" , "Men", "Women", "Kids", "Baby", "Seniors"],},
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
images  : {type : Array, require : true},
location  : { type : String, require : true},
contactNumber  : { type : Number, require : true},
status  : { type : String, require : true, default : "Available"},

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]

   
}, {
    timestamps: true
  })

const Clothe = mongoose.model('clothe', clotheSchema)
export default Clothe ;