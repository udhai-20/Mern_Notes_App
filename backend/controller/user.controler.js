const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.modal");
const { generateToken } = require("../utils/generatetoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    console.log(name, email);
    const userPresent = await UserModel.findOne({ email });
    if (userPresent) {
      res.status(400).send("User Already Exists");
      throw new Error("User Already Exists");
    }
    const user = await UserModel.create({ name, email, password, pic });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        message: "registerd successfully",
      });
    } else {
      res.status(400).send("Error Occured");
      throw new Error("Error Occured");
    }
  } catch (err) {
    console.log("err", err);
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        pic: user.pic,
      });
    } else {
      res.status(400).send("Invalid Email or Password");
      throw new Error("Invalid Email or Password");
    }
  } catch (err) {
    console.log("err", err);
  }
};

const profile_update = async (req, res) => {
  try {
    let user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.passwod) {
        user.passwod = req.body.passwod;
      }
      const update_User = await user.save();
      res.status(201).send({
        data: update_User,
        message: "updated",
      });
    } else {
      res.send({
        message: "failure",
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { registerUser, authUser, profile_update };
