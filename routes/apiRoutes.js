const fs = require('fs');
let notesData = require ('../db/db.json');

const shortid = require('shortid');
 
console.log(shortid.generate());


module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(notesData));
    app.post('/api/notes', (req, res) => {
        var newNote = {
            id: shortid.generate(), 
            title: req.body.title,
            text: req.body.text,
        }
        notesData.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
        res.json(notesData);
    });

    app.delete(`/api/notes/:id`, (req, res) => {
        console.log(req.params.id)
        notesData = notesData.filter(note => note.id !== req.params.id)
        fs.writeFile('./db/db.json',JSON.stringify(notesData), 'utf8', (error) => {
            if (error) 
            throw error;
            res.json(notesData);
        });
    })
}