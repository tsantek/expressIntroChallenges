var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
    res.send("stuff");
});




app.post('/create/:name/:age', (req, res) => {
    let obj = { "name": req.params.name, "age": req.params.age };
    let contents = fs.readFileSync('./storage.json', 'utf-8');
    let contentsArray = JSON.parse(contents);
    contentsArray.push(obj);
    var newContents = fs.writeFileSync('./storage.json', JSON.stringify(contentsArray));
    res.json(contentsArray);
})


app.get("/:name", function(req, res) {
    result = 400
    let contents = fs.readFileSync('./storage.json', 'utf-8');
    contents = JSON.parse(contents);
    for (let i = 0; i < contents.length; i++) {
        var itemName = contents[i]["name"];
        if (itemName === req.params.name) {
            result = contents[i]
        }
    }
    res.send(result);
});

app.get('/', function(req, res) {
    let result = fs.readFileSync(`./storage.json`, 'utf-8');
    res.send(result);
});

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(port, function() {
    console.log('Listening on port', port);
});