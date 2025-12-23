import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name : { type : String, require : true},
    email : { type : String, require : true, unique : true},
    password : { type : String, require : true},
    contact : { type : Number, require : true},
   
   
})

const User = mongoose.model('user', userSchema)
export default User ;