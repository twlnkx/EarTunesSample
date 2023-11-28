const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter seller name'],
        trim: true,
        maxLength: [100, 'seller name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter seller description'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ]
})

module.exports = mongoose.model('Seller', sellerSchema);