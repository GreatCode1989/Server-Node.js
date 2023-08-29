const http = require("http");
const fs = require('fs');
const path = require('path'); // Добавьте эту строку
const PORT = 3500;

http
  .createServer(function (req, res) {
    const url = req.url;
    console.log(url);

    res.setHeader('content-type', 'text/html; charset=utf-8');

    switch (url) {
      case "/":
        console.log("main page");
        res.write("<h1>Main</h1>");
        break;
      case "/contact":
        console.log("contact page");
        let data = fs.readFileSync('./public/contact.html', {encoding:'utf-8', flag: 'r'});
        res.write(data);
        break;
      case "/images/screen": // Добавьте этот кейс
        const imagePath = path.join(__dirname, 'public/images/screen.png'); // Укажите полный путь к изображению
        const image = fs.readFileSync(imagePath);
        res.setHeader('content-type', 'image/png'); // Установите правильный content-type для изображения
        res.end(image);
        break;
      default:
        console.log("404");
        res.write("<h1>404</h1>");
    }
    res.end();
  })
  .listen(PORT);
