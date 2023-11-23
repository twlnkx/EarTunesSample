const Product = require('../models/product')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')


exports.newProduct = async (req, res, next) => {
	
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
		req.body.user = req.user.id;

	const product = await Product.create(req.body);
	if (!product)
		return res.status(400).json({
			success: false,
			message: 'Product not created'
		})

	// res.status(200).json({
	// 	success: true,
	// 	product
	// })
	res.status(200).json({success:true});
	}catch (e) {
			console.log("Error server", e);
			res.status(400).json({error:"errooorrrr"});
	}
	
}

// exports.newProduct=async(req,res,next)=>{
// 	res.status(200).json({success:true});
// }

exports.getProducts = async (req, res, next) => {
	// const products = await Product.find({});
	try{
	const resPerPage = 4;
	const productsCount = await Product.countDocuments();
	const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()
	apiFeatures.pagination(resPerPage);
	const products = await apiFeatures.query;
	const filteredProductsCount = products.length
	if (!products) {
		return res.status(404).json({
			success: false,
			message: 'No Products'
		})
	}
	res.status(200).json({
		success: true,
		count: products.length,
		productsCount,
		products,
		resPerPage,
		filteredProductsCount,
	})
	  }catch (e){
		console.log("get product error", e)
	  }
}

// exports.getProducts = async (req,res,next) =>{
// 	res.status(200).json({success:true});
// }

exports.getSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	try{
			if (!product) {
			return res.status(404).json({
				success: false,				
				message: 'Product not found'
										})
			}else{
				res.status(200).json(product)}
	}catch(e){
			console.log("getSingleProduct error", e)
			res.status(400).json({error:"error getsingle product"})
		}
}

