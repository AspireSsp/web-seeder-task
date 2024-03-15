const express = require('express');
const { addNote, deleteNote, getAllNotes, updateNote } = require('../controller/notes');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/add").post(authenticate, addNote)
router.route("/delete/:id").delete(authenticate, deleteNote)
router.route("/update/:id").patch(authenticate, updateNote)
router.route("/get").get(authenticate, getAllNotes)

module.exports = router; 