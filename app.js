const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => (
    res.send("cepet jadi")
));

app.post('/add', (req, res) => {
    res.json({
        message : "woyyy",
    });
});


app.listen(port, () => {
    console.log(`jalan di ${port}`);
});