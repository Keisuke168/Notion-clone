const express = require("express")
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 5000;
require("dotenv").config();

app.use(express.json());

//DB connection
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("connecting to DB");
} catch(error) {
    console.log(error);
}
//register new user API
app.post("/register", async (req, res) => {
    const password = req.body.password;

    try {
        // encrypt password
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        // create new user
        const user = await User.create(req.body);
        // JWT
        const token = JWT.sign({ id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(200).json({ user, token }); 
    }catch(error){
        return res.status(500).json( error );
    }
});


//user login API

app.listen(PORT, ()=> {
    console.log("starting local server...")
});
