// Acceptance Criteria
// Application should allow users to create and save notes.
// Application should allow users to view previously saved notes.
// Application should allow users to delete previously saved notes.


//Initialize express server
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


const PORT = 3000;

// //Add middleware to express to look for files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});


//****API METHODS */

app.get('/api/notes', (req, res) => {
    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    res.sendFile(path.join(__dirname,'db/db.json'));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Date.now();
    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    notes.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(notes));

    res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.delete('/api/notes/:id', (req, res) => {
    // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    const updatedNotes = notes.filter(note => parseInt(note.id) !== parseInt(req.params.id));
    fs.writeFileSync('./db/db.json',JSON.stringify(updatedNotes));
    res.sendFile(path.join(__dirname,'public/notes.html'));
});


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
