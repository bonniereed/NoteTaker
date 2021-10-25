const route = require('express');
const routes = route.Router();

const { readAndAppend, readFromFile } = require('./notes');

// GET Route for retrieving all the feedback
routes.get('/', (req, res) => {
    readFromFile('./notes').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting feedback
routes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;

    // If all the required properties are present
    if ((text, title)) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, './db/notes.json');
        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in posting notes');
    }
});

module.export = routes;
