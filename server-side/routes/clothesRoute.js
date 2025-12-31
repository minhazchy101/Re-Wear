import express from 'express'
import { addClothes, deleteClothe, getAllClothes, like, updateClothes } from '../controllers/clothesController.js';
import { upload } from '../config/multer.js';
import { giverAuth } from '../middleware/giverAuth.js';
import { userAuth } from '../middleware/userAuth.js';

const clothesRouter = express.Router() ;

clothesRouter.post('/add-clothes', upload.array(["images"]), giverAuth, addClothes); 
clothesRouter.put('/edit-clothes/:id', upload.array(["images"]), giverAuth, updateClothes); 
clothesRouter.get('/like/:id', userAuth, like); 
clothesRouter.get('/deleteClothe/:id', giverAuth, deleteClothe); 
clothesRouter.get('/getAllClothes', getAllClothes); 

export default clothesRouter ;