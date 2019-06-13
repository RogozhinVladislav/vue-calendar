const express = require('express');
const path = require('path');
<<<<<<< HEAD

const app = express();
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/dist/index.html")
});
const port = process.env.PORT || 8080;
=======
const serveStatic = require('serve-static');

let app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
>>>>>>> deploy
app.listen(port, () => {
  console.log('Listening on port ' + port)
});