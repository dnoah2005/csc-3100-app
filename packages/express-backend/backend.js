import express from "express";
import userService from "./services/user-service.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error.");
    });
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("Resource not found.");
    });
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then(() => {
      res.status(201).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error.message);
    });
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("Resource not found.");
    });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

