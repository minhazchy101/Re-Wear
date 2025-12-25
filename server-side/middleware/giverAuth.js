import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const giverAuth = async(req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token) return res.send({success : false, message: "No Access"})
            
            const decoded = jwt.verify(token , `${process.env.JWT_SECRET}`)
        if(!decoded) return res.send({success : false, message: "No Access"})
            
          const user = await User.findById(decoded.id);
        if(!user) return res.send({success : false, message: "No Access"})
            req.giverId = decoded.id ;
        if (user.role === "sharer") {
            next()
        }else{
            return res.send({success : false, message: "No Access"})
        }
            
    } catch (error) {
        return res.send({success : false, message: error.message})
    }
}