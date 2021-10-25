const express = require('express');
const notesRoutes = require('./routes/notesRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', notesRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
