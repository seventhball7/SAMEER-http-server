const express = require("express");
const app = express();
const path = require("path");
const code = require("http").STATUS_CODES;

const port = 3000;

const uuid = {
  uuid: "14d96bb1-5d53-472f-a96e-b3a1fa82addd",
};

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>This is landing page</h1>");
});

app.get("/html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/data/data.html"));
});

app.get("/json", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/data/data.json"));
});

app.get("/uuid", (req, res) => {
  res.json(uuid);
});

app.get("/status/:statusCode", (req, res) => {
  const statusCode = req.params.statusCode;
  if (statusCode in code) {
    res.json({ statusCode: code[statusCode] });
  } else {
    res.status(404).send("<h1>File not found<h1>");
  }
});

app.get("/delay/:time", (req, res) => {
  let delayTime = req.params.time;
  setTimeout(() => {
    res.send(`<h1>success after ${delayTime} seconds</h1>`);
  }, delayTime * 1000);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
