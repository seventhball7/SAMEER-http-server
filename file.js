const http = require("http");
const code = require("http").STATUS_CODES;
const fs = require("fs");
const path = require("path");

//console.log(code)

const uuid = {
  uuid: "14d96bb1-5d53-472f-a96e-b3a1fa82addd",
};

let filePath;

const server = http.createServer((req, res) => {
  let arrayOfUrl = req.url.split("/");
  let statusCode = arrayOfUrl[arrayOfUrl.length - 1];

  if (req.url == "/") {
    res.write("Welcome here");
    res.end();
  } else if (req.url == "/html") {
    filePath = path.join(__dirname, "data.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writehead(501, "Not implemented");
        res.write("Unable to read html file");
        res.end();
      } else {
        res.write(data);
        res.end();
        console.log(req.url);
      }
    });
  } else if (req.url == "/json") {
    filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writehead(501, "Not implemented");
        res.write("unable to read json file");
        res.end();
      } else {
        res.write(data);
        res.end();
        console.log(req.url);
      }
    });
  } else if (req.url == "/uuid") {
    res.write(JSON.stringify(uuid));
    res.end();
    console.log(req.url);
  } else if (req.url == `/status/${statusCode}`) {
    if (code[statusCode] != undefined) {
      res.writeHead(200, "OK", { "Content-type": "text/html" });
      res.write(`<h1>${statusCode} --> ${code[statusCode]}</h1>`);
      res.end();
      console.log(statusCode);
    } else {
      res.writeHead(501, "Not implemented", { "Content-type": "text/html" });
      res.write("<h1>Not able to find the status code</h1>");
      res.end();
    }
  } else if (req.url == `/delay/${statusCode}`) {
    setTimeout(() => {
      res.writeHead(200, "OK", { "Content-type": "text/html" });
      res.write("<h1>SUCCESS</h1>");
      res.end();
    }, statusCode);
  } else {
    res.writeHead(404, "Not Found", { "Content-type": "text/html" });
    res.write("<h1>Not found the page</h1>");
    res.end();
  }
});

server.listen(8080, () => {
  console.log(`listening from port 8080`);
});
