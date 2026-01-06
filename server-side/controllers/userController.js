import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Clothe from '../models/Clothes.js';


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

  
  // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // COOKIE OPTIONS 
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

 
  res.send({success : true, message: "Account created successfully!", user})
} catch (error) {
  
  res.send({success : false, message: `Sign Up failed for : ${error}`})
  }
  
}

// export const signin = async (req, res)=>{
//   console.log('token -> ',req.cookies.token)
//   if(req.cookies.token)  return res.send({success : false, message: "You are already signed in."
// })
//   try {
//       const { email, password} = req.body;

//   if(!email || !password) return res.send({success : false, message: "Credentials missing.!"})

//      const user = await  User.findOne({email})
//      if(!user) return res.send({success : false, message: "Something is wrong"})
      
//       const isMatch = bcrypt.compare(password, user.password)
//     if(!isMatch) return res.send({success : false, message: "Something is wrong"})

       
//   const token = jwt.sign({id : user._id}, `${process.env.JWT_SECRET}`);
//   res.cookie('token', token)
//    const populatedUser = await user.populate([
//   {
//     path: "clothesPost",
//     options: { sort: { createdAt: -1 } }
//   },
//   {
//     path: "selectItems",
//     options: { sort: { createdAt: -1 } }
//   },
//   {
//     path: "orderItems",
//     options: { sort: { createdAt: -1 } }
//   },
// ]);

//     const clothesPost = populatedUser.clothesPost; 
//     const selectItems = populatedUser.selectItems; 
//     const orderItems = populatedUser.orderItems; 
//   res.send({success : true, message: 'Welcome back! You’re sign in.', user, selectItems, clothesPost, orderItems})

//   } catch (error) {
//      res.send({success : false, message: `Sign In failed for : ${error}`})
//   }
// }

export const signin = async (req, res) => {
  try {
    //  already signed in check
    const existingToken = req.cookies?.token;
    if (existingToken) {
      return res.send({
        success: false,
        message: "You are already signed in.",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "Credentials missing!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // await added
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // COOKIE OPTIONS 
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // populate
    const populatedUser = await user.populate([
      { path: "clothesPost", options: { sort: { createdAt: -1 } } },
      { path: "selectItems", options: { sort: { createdAt: -1 } } },
      { path: "orderItems", options: { sort: { createdAt: -1 } } },
    ]);

    res.send({
      success: true,
      message: "Welcome back! You’re signed in.",
      user: populatedUser,
      clothesPost: populatedUser.clothesPost,
      selectItems: populatedUser.selectItems,
      orderItems: populatedUser.orderItems,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Sign in failed",
      error: error.message,
    });
  }
};

export const isUser = async(req, res)=>{
  
  try {
   const user = await User.findOne({_id : req.id}).populate([
  {
    path: "clothesPost",
    options: { sort: { createdAt: -1 } }
  },
  {
    path: "selectItems",
    options: { sort: { createdAt: -1 } }
  },
  {
    path: "orderItems",
    options: { sort: { createdAt: -1 } }
  },
]);
const clothesPost = user.clothesPost ;
const selectItems = user.selectItems ;
const orderItems = user.orderItems ;
   res.send({success : true, user, clothesPost,
selectItems,
orderItems})
  } catch (error) {
     res.send({success : false, message: `User not Found for : ${error}`})
  }
}

export const logout = async (req, res)=>{
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.json({success : true, message : "User Sign Out SuccessFully"})
  } catch (error) {
      res.send({success : false, message: `Log out failed for : ${error}`})
  }
}


export const selectItems = async (req, res) => {
  const takerId = req.takerId;
  const itemsId = req.body.id;

  try {
    const clothe = await Clothe.findOne({ _id: itemsId });
    const user = await User.findOne({ _id: takerId });
    
    if (!user || !clothe) {
      return res.status(404).json({ success: false, message: "User or Clothe not found." });
    }

    
    user.selectItems.push(clothe._id);
    await user.save();

 
    const populatedUser = await User.findOne({ _id: takerId }).populate({
      path: "selectItems",
       options: { sort: { createdAt: -1 } }
    });

    const selectItems = populatedUser.selectItems; 
    
    res.send({ success: true, message: "Item has been selected successfully!", selectItems });
  } catch (error) {
    res.send({ success: false, message: `Select items failed for: ${error.message}` });
  }
};