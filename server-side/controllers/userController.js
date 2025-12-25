import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';


export const signup = async(req,res)=>{
  try {
console.log('token -> ',req.cookies.token)
    if(req.cookies.token)  return res.send({success : false, message: "You are already signed in."})

    const {name, email , contact, password, role} = req.body;
   if(!name || !email  || !contact || !password , !role) return res.send({success : false, message: "Credentials missing.!"})
    const usedEmail = await  User.findOne({email})

  if(usedEmail) return res.send({success : false, message: "Credentials Already Used.!"})


  const passHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password : passHash,
    contact,
    role
  })

  
  const token = jwt.sign({id : user._id}, `${process.env.JWT_SECRET}`);

  res.cookie('token', token)

 
  res.send({success : true, message: "Account created successfully!", user})
} catch (error) {
  
  res.send({success : false, message: `Sign Up failed for : ${error}`})
  }
  
}

export const signin = async (req, res)=>{
  console.log('token -> ',req.cookies.token)
  if(req.cookies.token)  return res.send({success : false, message: "You are already signed in."
})
  try {
      const { email, password} = req.body;

  if(!email || !password) return res.send({success : false, message: "Credentials missing.!"})

     const user = await  User.findOne({email})
     if(!user) return res.send({success : false, message: "Something is wrong"})
      
      const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch) return res.send({success : false, message: "Something is wrong"})

       
  const token = jwt.sign({id : user._id}, `${process.env.JWT_SECRET}`);
  res.cookie('token', token)
  res.send({success : true, message: 'Welcome back! You’re sign in.', user})

  } catch (error) {
     res.send({success : false, message: `Sign In failed for : ${error}`})
  }
}

export const isUser = async(req, res)=>{
  
  try {
   const user = await User.findOne({_id : req.id}).populate("clothesPost").sort({createdAt : -1})
   res.send({success : true, user})
  } catch (error) {
     res.send({success : false, message: `User not Found for : ${error}`})
  }
}

export const logout = async (req, res)=>{
  try {
    res.clearCookie('token')
    res.json({success : true, message : "User logout SuccessFully"})
  } catch (error) {
      res.send({success : false, message: `Log out failed for : ${error}`})
  }
}
































// 


// exports.createUser =  async(req, res)=>{
//   const userData = await userSchema.create({
//     name : "String MRC",
//     email : "String@",
//     image : "String.png",
//     role : "StringRole",
//   })
//   res.json(userData)
//   console.log(userData)
// }

// exports.readUsers = async(req, res)=>{
//   const userUpdatedData = await userSchema.find()
//   res.json(userUpdatedData)
//   console.log(userUpdatedData)
// }

// exports.readUser = async(req, res)=>{
//   const userUpdatedData = await userSchema.findOne({_id : "694156f22fefb0af5df994bd"})
//   res.json(userUpdatedData)
//   console.log(userUpdatedData)
// }

// exports.updateUser = async(req, res)=>{
//   const userUpdatedData = await userSchema.findOneAndUpdate({_id : "694156f22fefb0af5df994bd"},
//     {
//     name : "String Updated",
//     email : "String@",
//     image : "String.png",
//     role : "StringRole",
//   })
//   res.json(userUpdatedData)
//   console.log(userUpdatedData)
// }

// exports.deleteUser = async(req, res)=>{
//   const userUpdatedData = await userSchema.findOneAndDelete({_id : "694156f22fefb0af5df994bd"})
//   res.json(userUpdatedData)
//   console.log(userUpdatedData, 'Deleted')
// }