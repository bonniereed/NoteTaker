const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
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

app.get('/', (req, res) => res.json(`GET route`));
app.post('/', (req, res) => res.json(`POST route`));
app.put('/:id', (req, res) => res.json(`PUT route`));
app.delete('/:id', (req, res) => res.json(`DELETE route`));
app.patch('/:id', (req, res) => res.json(`PATCH route`));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
