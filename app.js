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
    var app = express();

    const imageDir = './cards';

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

    app.get('/start/12', function(req, resp) {  //hard coded for testing
        var img = fs.readFileSync(imageDir + '/d3.png');
        resp.writeHead(200, {'Content-Type': 'image/png' });
        resp.end(img, 'binary');
    });

    if(!module.parent){
        app.listen(port, function(){
            console.log("Server process started, id:" + cluster.worker.id);
        });
    }

    /*
    function readImages(res){
        if (typeof pic === 'undefined') {
            getImages(imageDir, function (err, files) {
                var imageLists = '<ul>';
                for (var i=0; i<files.length; i++) {
                    console.log(files[i]);
                    imageLists += '<li><a href= localhost:' + port + '/?image=' + files[i] + '">' + files[i] + '</li>';
                }
                imageLists += '</ul>';
                res.writeHead(200, {'Content-type':'text/html'});
                res.end(imageLists);
            });
        } else {
            fs.readFile(imageDir + pic, function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end("No such image");
                } else {
                    res.writeHead(200,{'Content-type':'image/png'});
                    res.end(content);
                }
            });
        }
    }

    function getImages(imageDir, callback) {
        var fileType = '.png',
            files = [], i;
        fs.readdir(imageDir, function (err, list) {
            for(i=0; i<list.length; i++) {
                if(path.extname(list[i]) === fileType) {
                    files.push(list[i]);
                }
            }
            callback(err, files);
        });
    }*/
}

