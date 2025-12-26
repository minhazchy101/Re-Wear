import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const takerAuth = async(req, res, next)=>{
    try {
        const {token} = req.cookies;
        
        if(!token) return res.send({success : false, message: "No Token"})
            
            const decoded = jwt.verify(token , `${process.env.JWT_SECRET}`)
            if(!decoded) return res.send({success : false, message: "No Decoded"})
                
                const user = await User.findById(decoded.id);
        if(!user) return res.send({success : false, message: "No User"})
            req.takerId = decoded.id ;
        if (user.role === "finder") {
            next()
        }else{
            return res.send({success : false, message: "Taker Auth No Access"})
        }
            
    } catch (error) {
        return res.send({success : false, message: error.message})
    }
}