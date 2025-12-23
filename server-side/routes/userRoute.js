
import express from 'express';
import { isUser, logout, signin, signup } from '../controllers/userController.js';
import { userAuth } from '../middleware/userAuth.js';
const userRouter = express.Router();

// C
userRouter.post('/signup', signup)
userRouter.post('/signin',signin)
userRouter.get('/isUser',userAuth, isUser)
userRouter.get('/logout',userAuth, logout)

// // R
// userRouter.get('/readUsers',readUsers)

// userRouter.get('/readUser', readUser)
// // U
// userRouter.get('/updateUser', updateUser)
// // D
// userRouter.get('/deleteUser', deleteUser)

export default userRouter ;