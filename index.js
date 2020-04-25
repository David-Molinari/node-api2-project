const express = require("express");

const cors = require("cors");

const postsRouter = require("./data/router.js"); // <-----=====

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter); // <--------=============

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.listen(4001, () => {
  console.log("\n*** Server Running on http://localhost:4001 ***\n");
});