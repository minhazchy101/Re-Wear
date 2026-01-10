
import express from 'express';
import { isUser, logout, selectItems, signin, signup } from '../controllers/userController.js';
import { userAuth } from '../middleware/userAuth.js';
import { takerAuth } from '../middleware/takerAuth copy.js';
const userRouter = express.Router();


userRouter.post('/signup', signup)
userRouter.post('/signin',signin)
userRouter.get('/isUser',userAuth, isUser)
userRouter.post('/logout',userAuth, logout)

userRouter.post('/select-item', takerAuth, selectItems)


export default userRouter ;