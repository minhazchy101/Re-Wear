import jwt from 'jsonwebtoken'

export const userAuth =(req, res, next) =>{
    try {
       const {token} = req.cookies ; 
   
    if(!token)  return res.send({success : false,message: "Access denied."})
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
     if(!decoded.id)  return res.send({success : false, message: "decoded.id"})
     req.id = decoded.id ;
    next() 
    } catch (error) {
         res.send({success : false, message: "Unauthorized"})
    }
    
}