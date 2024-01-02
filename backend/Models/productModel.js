const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter product name"],
        trim: true,

    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price."],
        maxLength: [7, "Price cannot exceed from 7 letters"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description."],

    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,

            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "PLease Enter Product Category"],

    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        { 
            user : {
                // get whenever product created
                type : mongoose.Schema.ObjectId,
                ref: 'User',  // means we are getting it by document of User Collection
                required : true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },

    user : {
        // get whenever product created
        type : mongoose.Schema.ObjectId,
        ref: 'User',  // means we are getting it by document of User Collection
        required : true,
    }
})

module.exports = mongoose.model("Product", productSchema);