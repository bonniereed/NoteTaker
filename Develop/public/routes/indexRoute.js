const express = require('express');
// Import our modular routers for /notes
const notesRouter = require('./db/notes.json');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
