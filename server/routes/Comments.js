const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware"); //El middleware que realizará la
//verificación para luego poder seguir adelante con la función gracias a next()

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username; //Creamos un objeto que tiene el comment y el nombre de usuario
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
