const express = require('express');
const multer = require('multer'); // Middleware pour gérer les fichiers
const cors = require('cors'); // utilisation de cors pour l'acces
const mysql = require('mysql'); // connexion  au base de donne
const app = express();
const port = 3000;


// connexion au mysql

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sport'
});

db.connect();

// autoriser a tous les domainess
app.use(cors({
    origin:"*"
  }));

// utiliser le dossire de stockages
app.use(express.static('uploads'));

//selection user au db par email (login)
app.get("/user/:email", (req, res) => {
    let email = req.params.email;
    var sql = `SELECT * FROM user WHERE email='${email}'`;
    db.query(sql, function (error, result) {
      if (!result) {
        res.send({ status: false, message: "compte introuvable" });
      } else {
        res.send({ status: true, message: "user connected successfully", data: result });
      }
    });
  });

//signup into db // insertion d'info d'utilisateur dans la base de donnée

server.post("/person/add", (req, res) => {
    let detailsUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, detailsUser, (error) => {
      if (error) {
        res.send({ status: false, message: "user created Failed" });
      } else {
        res.send({ status: true, message: "user created successfully" });
      }
    });
  });
























// Définissez le dossier de destination pour les vidéos
const uploadDir = 'uploads/';

// Utilisez Multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    }
});
const upload = multer({ storage });


// Gérez la demande POST pour le téléchargement de la vidéo
app.post('/upload', upload.single('video'), (req, res) => {
    res.send('La vidéo a été téléchargée avec succès.');
});

app.listen(port, () => {
    console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
});
