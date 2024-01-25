const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto  = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8020;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://chinhtran1005:chinhtran1005@cluster0.1fkwch0.mongodb.net/"
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");
// //function to send verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chinhtran2982020@gmail.com",
      pass: "teca wvub ppvk ccyr",
    },
  });

  //compose the email message 
  const mailOptions = {
    from: "FurinShop.com",
    to: email,
    subject: "Email Verification",
    text: ` Please click the following link to verify your email: http://192.168.43.48:8020/verify/${verificationToken}`,
  };
  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

//endpoint to register in the app
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     //check if the email is already registered
//     const exitingUser = await User.findOne({ email });
//     if (exitingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }
//     //create a new User
//     const newUser = new User({ name, email, password  });
//     //generate and store the verification token
//     newUser.verificationToken = crypto.randomBytes(20).toString("hex");
//     //save the user to the database
//     await newUser.save();
//     //send verification email to the user
//     sendVerificationEmail(newUser.email, newUser.verificationToken);
//   } catch (error) {
//     console.log("error registering user", error);
//     res.status(500).json({ message: "Registration failed" });
//   }
// });


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }
    // Create a new user
    const newUser = new User({ name, email, password });
    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    // Save the user to the database
    await newUser.save();
    // Debugging statement to verify data
    console.log("New User Registered:", newUser);
    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //Find the user witht the given verification token 
    const user = await User.findOne({verificationToken: token});
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex")
  return secretKey
}

const secretKey =generateSecretKey()

//endpoint to login the user!
app.post("/login", async(req, res) =>{
  try{
    const {email, password} = req.body;
    //check if the user exists
    const user = await User.findOne({email});
    if(!user) {
      return res.status(401).json({message: "Invalid email or password" });
    }
    //check if the password is correct
    if(user.password != password){
      return res.status(401).json({message: "Invalid password" });}
    if(user.verified != 'true'){
      return res.status(401).json({message: "Please email verified" });}
 
      //generate a token
      const token = jwt.sign({userId:user._id},secretKey)
      res.status(200).json({token})
  }catch(error) {
    res.status(500).json({message: "Login Failed" });
  }});


  //endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//User
app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Tìm người dùng trong MongoDB bằng userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Trả về thông tin người dùng
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Endpoint update user
app.put("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, mobileNo } = req.body;

    // Tìm người dùng trong MongoDB bằng userId 
    const user = await User.findById(userId);
    if (!user) { 
      return res.status(404).json({ message: "User not found" });
    }
    // Cập nhật thông tin người dùng nếu có các trường được cung cấp
    if (name) user.name = name;
    if (email) user.email = email;
    if (mobileNo) user.mobileNo = mobileNo;

    // Lưu trạng thái cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user data" });
  }
});

// Endpoint update password
app.put("/user/updatePassword/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const {password, newpassword} = req.body;

    // Tìm người dùng trong MongoDB bằng userId 
    const user = await User.findById(userId);
    if (!user) { 
      return res.status(404).json({ message: "User not found" });
    }
    //kiểm tra mật khẩu
    if(user.password != password){
      return res.status(401).json({message: "Sai mật khẩu" });}
    user.password = newpassword;
    // Lưu trạng thái cập nhật vào cơ sở dữ liệu
    await user.save();
    res.status(200).json({ message: "Cập nhật thành công", user });
  } catch (error) {
    res.status(500).json({ message: "Cập nhật lỗi" });
  }
});

// Endpoint delete address
app.delete("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    // Tìm người dùng trong MongoDB bằng userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm và xóa địa chỉ dựa trên addressId
    const addressIndex = user.addresses.findIndex(address => address._id == addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses.splice(addressIndex, 1);
    // Lưu trạng thái cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  } 
});


// Endpoint update address
app.put("/addresses/update/:userId/:addressId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const { name, houseNo, street, state, city, country ,mobileNo, postalCode } = req.body;

    // Tìm địa chỉ trong MongoDB bằng userId và addressId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Cập nhật các trường thông tin của địa chỉ
    address.name = name || address.name;
    address.houseNo = houseNo || address.houseNo;
    address.street = street || address.street;
    address.state = state || address.state;
    address.city = city || address.city;
    address.country = country || address.country;
    address.mobileNo = mobileNo || address.mobileNo;
    address.postalCode = postalCode || address.postalCode;
    
    // Lưu trạng thái cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "Cập nhật địa chỉ thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cập nhật địa chỉ lỗi" });
  }
});



//CARTS
// Endpoint to add a product to the user's cart
app.post("/carts/addProduct/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { product } = req.body;
    // Find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingProductIndex = user.carts.findIndex(
      (cartProduct) => cartProduct.id == product.id
      
    );

    if (existingProductIndex !== -1) {
      user.carts[existingProductIndex].quantity += 1;
    } else {
      // If the product does not exist, add it to the carts array
      user.carts.push({
        title: product.title,
        category: product.category,
        price: product.price,
        Image: product.image,
        quantity: 1,
        id: product.id,
      });
    }
    // Save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
});
 
// Endpoint to get all products in the user's cart
app.get("/carts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productsInCart = user.carts;
    console.log(productsInCart)
    res.status(200).json({ productsInCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products from cart" });
  }
});

//Cart product deletion endpoint
app.delete("/carts/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId; 
    const productId = req.params.productId;

    // Tìm người dùng trong MongoDB bằng userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(405).json({ message: "User not found" });
    }

    // Tìm và xóa sản phẩm dựa trên productId
    const productIndex = user.carts.findIndex(product => product._id == productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    user.carts.splice(productIndex, 1);

    // Lưu trạng thái cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "Product deleted from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product from cart" });
  }
});

// Update cart product quantity endpoint
// plus the product quantity
app.put("/carts/:userId/:productId/increaseQuantity", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    // Find the user in MongoDB by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Find the product in the cart based on productId
    const product = user.carts.find(product => product._id == productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
    // Increase the quantity by 1
    product.quantity += 1;
    // Save the updated user to the database
    await user.save();
    res.status(200).json({ message: "Quantity increased successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error increasing quantity" });
  }
});

//minus the product quantity
app.put("/carts/:userId/:productId/reducequantity", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    // Find the user in MongoDB by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Find the product in the cart based on productId
    const product = user.carts.find(product => product._id == productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
    // Increase the quantity by 1
    if(product.quantity > 1)
      product.quantity -= 1;
    // Save the updated user to the database
    await user.save();
    res.status(200).json({ message: "Quantity increased successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error increasing quantity" });
  }
});
