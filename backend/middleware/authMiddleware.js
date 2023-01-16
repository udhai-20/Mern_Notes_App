const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.modal");
const env = require("dotenv");
env.config();

const protect = async (req, res, next) => {
  console.log(req.headers);
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const deocode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode,deocode", deocode);
      req.user = await UserModel.findById(deocode.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
      throw new Error("Not authorised, token failed");
    }
  }
  if (!token) {
    res.status(400).send({
      err: "Not authorised, token failed",
    });
  }
};

module.exports = { protect };
