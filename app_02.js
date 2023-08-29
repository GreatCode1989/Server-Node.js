const http = require('http');

http.createServer(function(request, response){
    console.log(request.url);
    console.log(request.method);
    console.log('server');

    response.setHeader('content-type', 'text/html; charset=utf-8');
    response.write('<h2>Hello, world</h2>');
    response.write('<p>hello, world</p>');
    response.end();
}).listen(3500);

