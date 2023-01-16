const express = require("express");
const { notes } = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/db");
const notes_Router = require("./Routers/notes.route");
const userRouter = require("./Routers/user.router");
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home Page");
});

app.use("/user", userRouter);
app.use("/notes", notes_Router);

app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running on the port http://localhost:${port}/`);
  } catch (err) {
    console.log("connection to be failed");
    console.log(err);
  }
});
