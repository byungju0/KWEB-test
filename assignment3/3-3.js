const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

function factorial(n){
    if(n == 0){
        return 1;
    }else{
        return n * factorial(n-1);
    }
}

app.get('/factorial', (req, res) => {
    const number = req.query.number;
    res.redirect(`/factorial/${number}`);
});

app.get('/factorial/:number', (req, res) => {
    const num = parseInt(req.params.number, 10);
    const result = factorial(num);
    res.send(result.toString());
});

app.listen(port, () => {
    console.log('Server running at port 3000');
});