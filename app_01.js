const http = require('http')

http.createServer(function(request, response){
    console.log('server')
    response.end('1')
}).listen(3500)