const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/board/page/:page', (req, res) => {
    const pageNum = req.params.page;
    res.send(`This is page ${pageNum}`);
});

app.listen(port, () => {
    console.log('Server running on port 3000');
});