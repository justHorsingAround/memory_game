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
    const path = require('path');
    const _url = require('url');
    var app = express();

    const imageDir = './cards';

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const port = 9999;

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

    app.get('/start/10', function(req, resp) {  //hard coded for now
        getListOfCards(resp);
    });

    app.get('/getcards', function(req, resp){
        let currentCard = req.query.card;
        console.log(currentCard);
        var img = fs.readFileSync(imageDir + '/' + currentCard);
        resp.writeHead(200, {'Content-Type': 'image/png'});
        resp.end(img, 'binary');
    });



    if(!module.parent){
        app.listen(port, function(){
            console.log("Server process started, id:" + cluster.worker.id);
        });
    }

    function getListOfCards(res){
        files = [], i;
        var fileType = '.png';
        fs.readdir(imageDir, function (err, list) {
            for(i=0; i<list.length; i++) {
                if(path.extname(list[i]) === fileType) {
                    files.push(list[i]);
                }
            }
            res.writeHead(200, {'Content-type':'text/html'});
            for (var i=0; i<files.length; i++) {
                res.write(files[i] + ',');
            }
            res.end();
        });
    }
}

