const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

function objectToString(obj){
    if(typeof obj !== 'object' || obj === null) return String(obj);
    return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n');
}

app.get('/', (req, res) => {
    res.send(objectToString(req.query));
});

app.post('/', (req, res) => {
    res.send(objectToString(req.body));
});

app.put('/', (req, res) => {
    res.send(objectToString(req.body));
});

app.delete('/', (req, res) => {
    res.send(objectToString(req.body));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});