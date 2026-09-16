import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor",
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer",
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor",
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress",
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender",
        },
    ],
};

// Helper functions

const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) => {
    return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex(
        (user) => user["id"] === id
    );

    if (index === -1) {
        return undefined;
    }

    return users["users_list"].splice(index, 1)[0];
};

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

const generateId = () => {
    return Math.random().toString(36).substring(2, 8);
};

// Routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined) {
        let result = findUsersByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);

    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    const newUser = {
        id: generateId(),
        name: userToAdd.name,
        job: userToAdd.job,
    };

    addUser(newUser);

    res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const result = deleteUserById(id);

    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

