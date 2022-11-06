const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    // encrypt password
    req.body.password = CryptoJS.SHA256(password).toString();
    // create new user
    const user = await User.create(req.body);
    // JWT
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        param: "username",
        message: "ユーザー名が無効です",
      });
    }
    //パスワードの照合
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    if (encryptedPassword !== user.password) {
      return res.status(401).json({
        param: "password",
        message: "パスワードが間違っています",
      });
    }

    // JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
