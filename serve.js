var express = require("express");

var app = express();
app.use(express.static('./public'));
app.use('/build/', express.static('./build'));

console.log('run 3000');
app.listen(3000);
