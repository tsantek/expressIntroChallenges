var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');

app.get('/yourroute', function(req, res) {
    res.send("stuff");
});

app.get('/hello', function(req, res) {
    res.send("Hello");
});

app.get('/verify/:age', function(req, res) {
    let result;
    if (req.params.name > 13) {
        result = 200
    } else {
        result = 403
    }
    res.sendStatus(result)
});

app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});



app.post('/create/:name', function(req, res) {
    res.send(`{ "id":1, "name": ${req.params.name} }`)
})

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(port, function() {
    console.log('Listening on port', port);
});