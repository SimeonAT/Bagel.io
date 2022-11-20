require('dotenv').config();
// const objects = require("./objects");
const express = require("express");
const bodyParser = require("body-parser");
// const sendError = require("./sendError");
// const { response } = require('express');
// const { replicationStart } = require('pg-protocol/dist/messages.js');
const tasks = require("./tasks");
// const verify = require("./verify");

const server = express();
// const PORT = 8000;

// BELOW ADDED
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use(bodyParser.json());

server.post("/register", tasks.register);
server.post("/logindatabase", tasks.loginDatabase);
server.post("/getTasks", tasks.getTasks);
server.post("/scheduletask", tasks.scheduletask);
server.post("/updateTask", tasks.updateTask);
server.post("/fetchTags", tasks.fetchTags);
server.post("/setuptesting", tasks.setuptesting);

exports.server = server;