import express from "express";
let app = express();

let hostname = "localhost";
let port = 8017;

app.get("/helloword", (req, res) => {
  res.send("<h1>Hello APP CHat</h1>")
});

app.listen(port, hostname, () => { 
  console.log('hello app chat $(hostname):${port}/');
});