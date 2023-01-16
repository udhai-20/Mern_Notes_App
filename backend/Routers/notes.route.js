const { Router } = require("express");
let notes_Router = Router();
const { notes } = require("../data/data");
const {
  getNotes,
  addNotes,
  findnote_by_id,
  note_update,
  note_delete,
} = require("../controller/note.controler");
const { protect } = require("../middleware/authMiddleware");

notes_Router.route("/get").get(protect, getNotes);
notes_Router.route("/create").post(protect, addNotes);
notes_Router
  .route("/:id")
  .get(findnote_by_id)
  .patch(protect, note_update)
  .delete(protect, note_delete);

// notes_Router.get("", (req, res) => {
//   res.send(notes);
// });

// notes_Router.get("/:id", (req, res) => {
//   const indv_data = notes.find((el) => el._id == req.params.id);
//   console.log("indv_data", indv_data);
//   if (indv_data) {
//     res.send(indv_data);
//   } else {
//     res.send({ res: "no data found" });
//   }
//   notes_Router.post("/create", (req, res) => {});
// });

module.exports = notes_Router;
