import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/Metadata'

import axios from 'axios'
import { toast, } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getUser, getToken, successMsg, errMsg } from '../../utils/helpers'
// import ListReviews from '../Review/ListReviews'


const ProductDetails = ({ cartItems, addItemToCart }) => {

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [errorReview, setErrorReview] = useState('');
    const [success, setSuccess] = useState('')
    const [user, setUser] = useState(getUser())



    let { id } = useParams()
     //useParams - gets the variable from the url

    let navigate = useNavigate()
    // const alert = useAlert();
    // const { cartItems } = state

    const productDetails = async (id) => {
        let link = `http://localhost:4012/api/v1/product/${id}`
        try {
            let res = await axios.get(link)
            setProduct(res.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError('Product not found')
            setLoading(false)
        }

    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const addToCart = async () => {
        await addItemToCart(id, quantity);
    }

   
    useEffect(() => {
        // constant change
        productDetails(id);
    },[id])
    // dependencies list - they are the ones that constantly change
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    
    // console.log(state.cartItems)
    // console.log(cart)
    return (
        <Fragment>

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {/* {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings} >
                                Submit Your Review
                            </button> : <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>} */}

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}
export default ProductDetails