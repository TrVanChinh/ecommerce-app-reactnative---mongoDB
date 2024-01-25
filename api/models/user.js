const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true 
    },
    mobileNo:  String,
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    photo: {
        type: String,
        required:false

    },
    verified: {
        type: String,
        default:false
    },
    verificationToken: String,
    addresses: [
        {
            name: String,
            mobileNo:String,
            houseNo:String,
            street:String,
            state:String,
            city:String,
            country:String,
            postalCode:String,
        }
    ],
    carts: [
        { 
            title: String,
            category:String,
            price:Number,
            Image:String,
            quantity:Number,
            id:String,
        }
    ],
    createAt: { 
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User