import express, { json as express_json, static as express_static } from "express";

import http from "node:http";

const SERVER_PORT                = 8081;

const app    = express();
const server = http.createServer({}, app);

app.use(express_json());
app.use(express_static("docs"));

server.listen(SERVER_PORT, function () {
  console.log("Listening on port: " + SERVER_PORT);
});