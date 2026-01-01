import {v2 as cloudinary}  from 'cloudinary'
import Clothe from '../models/Clothes.js';
import User from '../models/user.js';

export const addClothes = async (req, res) => {
  try {
    const id = req.giverId
    const user = await User.findById(id); 

if (!user) {
  return res.status(404).json({ success: false, message: "User not found" });
}
    const clothesData = JSON.parse(req.body.clothesData);
    const images = req.files;
    let imagesURL = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const finalData = {
      ...clothesData,
      images: imagesURL, 
      giverName : user.name,   
      giverEmail : user.email,   
      giverId : id,   
    };
    const data = await Clothe.create(finalData) ;
  user.clothesPost.push(data._id) ;
  await user.save()
    res.json({
      success: true,
      message: "Clothes added successfully",
      data,
    });
  } catch (error) {
    console.log("Add Clothes Error -> ", error.message);
    res.json({ success: false, message: error.message });
  }
};


export const updateClothes = async (req, res) => {
  try {
    const clothesId = req.params.id;
    const id = req.giverId; 
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const clothe = await Clothe.findById(clothesId);
    if (!clothe) {
      return res.status(404).json({ success: false, message: "Clothe not found" });
    }

    // Parse form data
    const clothesData = JSON.parse(req.body.clothesData);

    // Handle new images
    const images = req.files || [];
    let imagesURL = [];
    if (images.length > 0) {
      imagesURL = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    // Keep existing images if provided
    const existingImages = req.body.existingImages
      ? Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages]
      : [];

    const finalImages = [...existingImages, ...imagesURL];

    // Update clothe document
    clothe.title = clothesData.title || clothe.title;
    clothe.description = clothesData.description || clothe.description;
    clothe.category = clothesData.category || clothe.category;
    clothe.size = clothesData.size || clothe.size;
    clothe.condition = clothesData.condition || clothe.condition;
    clothe.price = clothesData.price;
    clothe.isFree = clothesData.isFree;
    clothe.currency = clothesData.currency || clothe.currency;
    clothe.customCurrency = clothesData.customCurrency || clothe.customCurrency;
    clothe.location = clothesData.location || clothe.location;
    clothe.contactNumber = clothesData.contactNumber || clothe.contactNumber;
    clothe.images = finalImages;
    clothe.updatedAt = Date.now();

    await clothe.save();

    res.json({
      success: true,
      message: "Clothes updated successfully",
      data: clothe,
    });
  } catch (error) {
    console.log("Update Clothes Error -> ", error.message);
    res.json({ success: false, message: error.message });
  }
};


export const like = async (req, res) => {
  try {
    const userId = req.id;
    console.log("User ID:", userId);

    const clotheId = req.params.id;
    const clothe = await Clothe.findById(clotheId);
    console.log("Clothe before update:", clothe);

    if (!clothe) return res.status(404).json({ success: false, message: "Clothe not found" });

    if (!clothe.likes.includes(userId)) {
      clothe.likes.push(userId);
    } else {
      clothe.likes.splice(clothe.likes.indexOf(userId), 1);
    }

    await clothe.save();



    return res.status(200).json({ success: true, likes: clothe.likes });
  } catch (error) {
    console.error("Like Error ->", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllClothes =async (req, res)=>{
  try {
    const data = await Clothe.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Clothes added successfully",
      data,
    });

  } catch (error) {
    console.log("get All Clothes Error -> ", error.message);
    res.json({ success: false, message: error.message });
  }
}


export const deleteClothe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Clothe ID is required",
      });
    }

    const deletedClothe = await Clothe.findByIdAndDelete(id);

    if (!deletedClothe) {
      return res.status(404).json({
        success: false,
        message: "Clothe not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Clothe deleted successfully",
    });

  } catch (error) {
    console.error("Delete Clothe Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
