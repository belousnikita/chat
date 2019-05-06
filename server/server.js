import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import { serverPort } from "../config.json";

import store from "./storage/store";
import { User } from "./storage/components/storageComponents.js";

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.send(store.data);
});

app.get("/users", (request, response) => {
  response.send(store.get("users"));
});

app.get("/users/:username/", (request, response) => {
  const { username } = request.params;
  const user = store.get("users").find(user => user.username === username);
  if (user) {
    response.send(user);
  } else {
    response.send("Wrong username");
  }
});

app.get("/users/:username/messages", (request, response) => {
  const { username } = request.params;
  const user = store.get("users").find(user => user.username === username);
  if (user) {
    response.send(user.messages);
  } else {
    response.send(`Wrong username`);
  }
});

app.delete("/users/:username/:messageID", (request, response) => {
  const { username, messageID } = request.params;
  const user = store.get("users").find(user => user.username === username);
  user.removeMessage(messageID);
  response.send(`Meesage with id ${messageID} from ${username} deleted.`);
});

app.post("/users", (request, response) => {
  const { username } = request.body;
  const users = store.get("users");
  store.set("users", [...users, new User(username)]);
  response.send("User added");
});

app.post("/users/:username", (request, response) => {
  const { username } = request.params;
  const { message } = request.body;
  const user = store.get("users").find(user => user.username === username);
  user.addMessage(message);
  response.send("Message send");
});
const server = app.listen(serverPort, () =>
  console.log(`Server is up and running on port ${serverPort}`)
);
