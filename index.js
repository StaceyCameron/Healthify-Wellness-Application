const express = require('express');
const app = express();

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use(function(req, res) {
    res.status(404);
    res.send('The requested page does not exist.');
})

app.listen(3000, () => {
console.log('Server started on port 3000. Ctrl^c to quit.');
})