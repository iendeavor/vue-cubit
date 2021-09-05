"use strict";

const express = require("express");
const http = require("http");

const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on("upgrade", function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function (ws) {
  console.log("connected");

  ws.on("message", function (message) {
    console.log(`Received message ${message.toString()}`);
    ws.send(JSON.stringify(message.toString()));
  });

  ws.on("close", function () {
    console.log("closed");
  });
});

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
