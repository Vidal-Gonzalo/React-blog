const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

//Endpoints

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  await bcrypt.hash(password, 1).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body; //Tomo el username y password introducido por el usuario

  const user = await Users.findOne({ where: { username: username } }); //Lo guardo en una constante y sequelize
  //buscará el nombre de usuario en la base de datos que matchee con el introducido por el usuario

  if (!user) return res.json({ error: "El usuario no existe" }); //Si no matchea es porque no existe
  bcrypt.compare(password, user.password).then((match) => {
    //Compara la contraseña de ese usuario de la base de datos con la introducida por el usuario
    if (!match)
      return res.json({ error: "El usuario o contraseña son incorrectos" });

    const accessToken = sign(
      //Si matchea todo se crea este accessToken que contiene el nombre de usuario y el id de la sesión
      { username: user.username, id: user.id },
      "Secreto"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/validate", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/profileinfo/:id", async (req, res) => {
  const id = req.params.id;

  const profileInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  }); //Retribuye toda la información excluyendo la contraseña del usuario

  res.json(profileInfo);
});

module.exports = router;
