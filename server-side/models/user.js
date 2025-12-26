import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name : { type : String, require : true},
    email : { type : String, require : true, unique : true},
    password : { type : String, require : true},
    contact : { type : Number, require : true},
    role: {type : String },
    clothesPost : [{type : mongoose.Schema.Types.ObjectId, ref : 'clothe'}],
    selectItems : [{type : mongoose.Schema.Types.ObjectId, ref : 'clothe'}],
    orderItems : [{type : mongoose.Schema.Types.ObjectId, ref : 'order'}],
    workItems : [{type : mongoose.Schema.Types.ObjectId, ref : 'order'}],
    
},{timestamps: true})

const User = mongoose.model('user', userSchema)
export default User ;