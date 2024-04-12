// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.static('public'));

// Endpoint to get tasks
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If the file does not exist, return an empty object
                res.json({});
            } else {
                res.status(500).send('Error reading task data.');
            }
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to update tasks
app.post('/tasks', (req, res) => {
    fs.writeFile('tasks.json', JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error saving task data.');
            return;
        }
        res.status(200).send('Tasks updated.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

