const express = require('express');
const path = require('path');
const notes = require('./db/notes.json');
const api = require('./routes/indexRoute');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware,
const middleware = (req, res, next) => {
    // Log out the request type and resource
    console.log(`${req.method} request to ${req.path}`);

    console.log(`${res.method} request to ${res.path}`);
    // Built-in express method to call the next middleware in the stack.
    next();
};
app.use(middleware);
//api routes send notes in the 'get route
app.get('/api/notes', (req, res) => res.json(notes));
app.post('/api/notes', (req, res) => res.json(`POST route`));
app.put('/api/notes/:id', (req, res) => res.json(`PUT route`));
app.delete('/api/notes/:id', (req, res) => res.json(`DELETE route`));
app.patch('/api/notes/:id', (req, res) => res.json(`PATCH route`));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
