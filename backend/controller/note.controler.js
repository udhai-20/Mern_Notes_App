const { Notes } = require("../model/notes.model");

const getNotes = async (req, res) => {
  try {
    console.log("req", req.user._id);

    const note = await Notes.find();
    console.log("note", note);
    const specific_note = note.filter((el) => {
      return el.user.toString() == req.user._id.toString();
    });
    console.log(" specific_note:", specific_note);
    if (specific_note) {
      console.log("note:", note);
      res.status(201).send(specific_note);
    } else {
      res.status(404).send({
        message: "not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const addNotes = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      res.status(400).send({ message: "some fields are empty" });
      throw error("some fields are empty");
    } else {
      let note = await Notes.create({
        user: req.user._id,
        title,
        content,
        category,
      });
      await note.save();
      res.status(201).send({
        message: "success",
        data: note,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const findnote_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(" id:", id);
    const note_id = await Notes.findById(id);
    if (note_id) {
      res.status(201).send({ note_id });
    } else {
      res.status(400).send({
        message: "Notes not found",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "Notes or id not found",
    });
    console.log("err", err);
  }
};

const note_update = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Notes.findById(req.params.id);
    console.log("ote", note);
    console.log("cond", req.user._id, note.user);
    if (req.user._id.toString() != note.user.toString()) {
      res.status(400).send({
        message: "user not Uthorised to update",
      });
    }
    if (note) {
      console.log("note", note);
      note.title = title !== "" ? title : note.title;
      note.content = content !== "" ? content : note.content;
      note.category = category !== "" ? category : note.category;
      const updated_Note = await note.save();
      console.log(updated_Note);
      res.status(201).send({
        message: "updated",
        data: updated_Note,
      });
    } else {
      res.status(404).send({
        message: "Note Not Found",
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

const note_delete = async (req, res) => {
  try {
    let id_Del = req.params.id;
    // console.log("id_Del:", id_Del);
    const note = await Notes.find({ _id: id_Del });
    console.log("note:", note);
    console.log("note.user.toString()", note.user, req.user._id);
    if (note[0].user.toString() != req.user._id.toString()) {
      res.status(400).send({
        message: "user not Athorised to update",
      });
    }
    if (note) {
      await Notes.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "deleted successfully" });
    } else {
      res.status(400).send({ message: "id not found" });
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  getNotes,
  addNotes,
  findnote_by_id,
  note_update,
  note_delete,
};
