var cluster = require('cluster');

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

} else {
    var bodyParser = require('body-parser');
    const fs = require('fs');
    const express = require('express');
    var app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const port = 9999;

    app.get('/echo', function(req, resp){
        var currentTime = dateTime.create().format('Y-m-d H:M:S');
        resp.status(200);
        resp.send("The server responded at: " + currentTime);
    });

    app.get('/', function(req, resp){
        fs.readFile('index.html', function(err, data) {
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(data);
            resp.end();
        });
    });

    app.get('/main.css', function(req, resp) {
        fs.readFile('main.css', function(err, data) {
            resp.writeHead(200, {'Content-Type': 'text/css'});
            resp.write(data);
            resp.end();
        });
    });

    app.get('/game.js', function(req, resp) {
        fs.readFile('game.js', function(err, data) {
            resp.writeHead(200, {'Content-Type': 'text/javascript'});
            resp.write(data);
            resp.end();
        });
    });

    if(!module.parent){
        app.listen(port, function(){
            console.log("Server process started, id:" + cluster.worker.id);
        });
    }
}

