var http = require('http');
var dt = require('./mymodule');
var fs = require('fs');
var url = require('url');
var formidable = require('formidable');

http.createServer(function (req, res){
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            var oldPath = files.filetoupload.filepath;
            var newpath = 'D:/Teman Ngoding/' + files.filetoupload.originalFilename;
            fs.rename(oldPath, newpath, function(err){
                if(err) throw err;
                res.write('File uploaded and move');
                res.end();
            });
        });
    
    }else{
        var q = url.parse(req.url, true);
        var filename = "./" + q.pathname;
        fs.readFile(filename, function(err, data){
            if(err){
                res.writeHead('404', {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead('200', {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();    
        });
    }
}).listen('8080');