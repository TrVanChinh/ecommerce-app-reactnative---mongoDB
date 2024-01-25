const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products: [
        {
            name: {
                type: String,
                required:true
            },
            quanlity: {
                type: Number,
                required:true,
            },
            price: {
                type: Number,
                required:true,
            },
            Image: {
                type: String,
                required:true,
            },
        }
    ],
    
    totalPrice: {
        type: Number,
        required:true,
    },
    ShippingAddress: {
        name: {
            type: String,
            required:true
        },
        mobileNo: {
            type: String,
            required:true,
            unique: true
        },
        houseNo: {
            type: String,
            required:true,
        },
        street: {
            type: String,
            required:true
        },
        state: {
            type: String,
            default:false
        },
        city: {
            type: String,
            default:false
        },
        postalCode: {
            type: String,
            default:false
        },
    },
    paymentmenthod: {
        type: String,
        require: true,
    },
    createAt: {
        type:Date,
        default:Date.now
    }


})


const Order = mongoose.model("Order",orderSchema)
module.exports = Order
