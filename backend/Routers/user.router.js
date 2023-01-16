const { Router } = require("express");
const {
  registerUser,
  authUser,
  profile_update,
} = require("../controller/user.controler");
const { protect } = require("../middleware/authMiddleware");
const userRouter = Router();

userRouter.route("/post").post(registerUser);
userRouter.route("/login").post(authUser);
userRouter.route("/profile").post(protect, profile_update);
module.exports = userRouter;
