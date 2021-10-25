const util = require('util');
const fs = require('fs');
// Unique IDs https://www.npmjs.com/package/uuid#Quickstart
const { v4: uuidv4 } = require('uuid');

// https://developpaper.com/translation-node-js-8-util-promisify/
// Helpful doc on how fs.readfile and fs.writefile works
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('./db/db.json', JSON.stringify(note));
    }
    // Get all the notes from the db.json file
    getNotes() {
        return this.read().then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                allNotes = [];
            }

            return allNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        // Add a unique id to the note using uuid package referenced above
        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.write(updateNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        // `DELETE /api/notes/:id`
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Storage();
