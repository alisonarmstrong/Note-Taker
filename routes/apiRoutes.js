const fs = require('fs');
const notesData = require ('../db/db.json');


module.exports = (app) => {
    app.get('/api/notes', (req, res) => db.json(notesData));
    app.post('/api/notes', (req, res) => {
        notesData.push(req.body);
        fs.writeFileSync('.db/db.json', JSON.stringify(notesData), 'utf8')
    });
}