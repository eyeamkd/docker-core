const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const salt = bcrypt.genSaltSync(10);

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!validate(username, password))
      throw new Error("Invalid Username or Password");
    hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, hash });
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: {
        error,
      },
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await getHashForUsername(username);
    if (hash == null) throw new Error("Invalid Username or Password");
    if (bcrypt.compareSync(password, hash)) {
      res.status(200).json({
        status: "Signin success",
      });
    } else {
      res.status(403).json({
        status: "Signin failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Signin failed", 
      error
    });
  }
};

const validate = (username, password) => {
  if (username.length < 4 || password.length < 4) return false;
  else return true;
};

const getHashForUsername = async (username) => {
  const  {hash}  = await User.findOne({ username }).exec(); 
  console.log("Hash is",hash);
  return hash;
};
