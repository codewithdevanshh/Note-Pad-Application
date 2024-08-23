const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.post('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch {
        res.status(500).send("Some Error Occurred");
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid title').isLength({ min: 3 }),
    body('description', 'Enter a Valid description(minimum 5 characters)').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        try {

            const note = new Note({
                title, description, tag, user: req.user.id
            });

            const savednote = await note.save();

            res.json(savednote)

        } catch (error) {
            res.status(500).send("Some Error Occurred");
        }
        // res.json(notes);
    })

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {

        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("unauthorized");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("unauthorized");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occurred");
    }
})
module.exports = router;