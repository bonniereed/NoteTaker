const router = require('express').Router();
const storage = require('../storage/storage.js');

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
    storage
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file,
//and then return the new note to the client. You'll need to find a way to give each note a unique id
//when it's saved (look into npm packages that could do this for you).
router.post('/notes', (req, res) => {
    storage
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

// ## Bonus
// You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end.
// As a bonus, try to add the DELETE route to the application using the following guideline:
// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete.
// To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property,
// and then rewrite the notes to the `db.json` file.
router.delete('/notes/:id', (req, res) => {
    storage
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
