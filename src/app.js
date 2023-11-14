const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;



//only for test 
app.get('/', (req, res) => {
    res.send("hello world!");
});

app.listen(PORT);
