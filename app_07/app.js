const http = require("http");
const fs = require('fs');
const path = require('path'); 
const PORT = 3501;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
}

function staticFile(res, filePath, ext) {
    const absolutePath = path.join(__dirname, 'public', filePath);
    res.setHeader('Content-type', mimeTypes[ext]);
    
    fs.readFile(absolutePath, (error, data) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.end(data);
    });
}


http
  .createServer(function (req, res) {
    const url = req.url;
    console.log(url);

    switch (url) {
        case "/":
            console.log("main page");
            res.write("<h1>Main</h1>");
            break;
        case "/contact":
            console.log("contact page");
            staticFile(res, '/contact.html', '.html');
            break;
            default:
                const extname = String(path.extname(url)).toLowerCase()
                if(extname in mimeTypes) {
                 staticFile(res, url, extname)
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                    return;
                }
    }
    
  })
  .listen(PORT);
