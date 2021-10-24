const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('./db/notes.json');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    console.log(req.body);

    const { isValid, errors } = req.body;

    const payload = {
        time: Date.now(),
        errors,
    };

    if (!isValid) {
        readAndAppend(payload, './db/notes.json');
        res.json(`Note added`);
    } else {
        res.json({
            message:
                'Object is valid, failed to add note check front end implementation',
        });
    }
});

module.exports = notes;
