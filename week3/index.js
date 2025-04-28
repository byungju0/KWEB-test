const express = require('express');

const port = 3000;
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/', (req, res) => {

});
app.get('/page', (req, res) => {

});
app.get('/posts', (req, res) => {

});

app.listen(port, () => {
    console.log(`Serverlistening on port ${port}!`);
})