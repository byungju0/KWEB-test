const express = require('express');
const app = express();
const port = 3000;
 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form method="post" action="/login">
          <div>
            <label>Username:</label>
            <input id="username-input" name="username" type="text">
          </div>
          <div>
            <label>Password:</label>
            <input id="password-input" name="password" type="password">
          </div>
          <div>
            <div>Introduce yourself</div>
            <textarea id="introduction-input" name="introduction"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      `);
});

app.post('/login', (req, res) => {
    const { username, password, introduction } = req.body;
    const response = [
        `username: ${username}`,
        `password: ${password}`,
        `introduction: ${introduction}`
    ].join('\n');
    res.send(response);
});
app.listen(port, () => {
    console.log('Server runnning at port 3000');
});