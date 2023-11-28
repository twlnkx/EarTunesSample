const cloudinary = require('cloudinary')
const Seller = require('../models/seller')

exports.newSeller = async (req,res,next) => {
    try{
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }
    
        let imagesLinks = [];
        console.log(images)
        for (let i = 0; i < images.length; i++) {
            let imageDataUri = images[i]
            const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
                folder: 'products',
                width: 150,
                crop: "scale",
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
            req.body.images = imagesLinks
    
            const seller = await Seller.create(req.body);
            if (!seller)
                return res.status(400).json({
                    success: false,
                    message: 'Product not created'
                })
    
            res.status(200).json({success:true});
        }catch (e) {
                console.log("Error server", e);
                res.status(400).json({error:"errooorrrr"});
        }
}

// exports.newSeller = async(req,res,next) => {
//     res.status(200).json({success:true})
// }

exports.allSellers = async (req,res,next) =>{
    const sellers = await Seller.find()

    res.status(200).json({
        success: true,
    })
}

