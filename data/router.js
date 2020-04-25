const express = require("express");

const Hubs = require("./db.js");

const router = express.Router();

//1
router.post("/", (req, res) => {
  Hubs.insert(req.body)
    .then((hub) => {
      res.status(201).json(hub);
    })
    .catch((error) => {
      res.status(400).json({
        message: "Please provide title and contents for the post.",
      });
    });
});

//2
router.post("/:id/comments", (req, res) => {
  Hubs.insertComment(req.body)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "error adding messages" });
    });
});

//3
router.get("/", (req, res) => {
  Hubs.find()
    .then((hubs) => {
      res.status(200).json(hubs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

//4
router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

//5
router.get("/:id/comments", (req, res) => {
  Hubs.findPostComments(req.params.id)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "error reading comments" });
    });
});

//6
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Hubs.remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: "something failed, sorry" });
    });
});

//7
router.put("/:id", (req, res) => {
  const changes = req.body;

  console.log("changes:", changes);

  Hubs.update(req.params.id, changes)
    .then((count) => {
      if (count) {
        Hubs.findById(req.params.id)
          .then((hub) => {
            res.status(200).json(hub);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errorMessage: "error reading the updated posted" });
          });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

//8
router.get("/comments/:id", (req, res) => {
    Hubs.findCommentById(req.params.id)
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "error reading comments" });
      });
  });

module.exports = router;