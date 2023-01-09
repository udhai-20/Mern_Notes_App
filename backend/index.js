const express = require("express");
const { notes } = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/db");
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home Page");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const indv_data = notes.find((el) => el._id == req.params.id);
  console.log("indv_data", indv_data);
  if (indv_data) {
    res.send(indv_data);
  } else {
    res.send({ res: "no data found" });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running on the port http://localhost:${port}/`);
  } catch (err) {
    console.log("connection to be failed");
    console.log(err);
  }
});
