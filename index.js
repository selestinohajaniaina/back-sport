const express = require('express');
const multer = require('multer'); // Middleware pour gérer les fichiers
const cors = require('cors'); // utilisation de cors pour l'acces
const mysql = require('mysql'); // connexion  au base de donne
const app = express();
const port = 3000;


// connexion au mysql

const db = mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'sport'
    host:'www.db4free.net',
    user:'selestino',
    password:'SELESTINO',
    database:'sport_database',
    // insecureAuth : true
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

app.post("/person/add", (req, res) => {
    let detailsUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      pays: req.body.pays,
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, detailsUser, (error) => {
      if (error) {
        res.send({ status: false, message: "user created Failed" });
      } else {
        res.send({ status: true, message: "user created successfully" });
      }
    });

    let sql1 = `SELECT * FROM user WHERE email='${detailsUser.email}'`;
    let id1;
    db.query(sql1, (error, result) => {
      if (error) {
        res.send({ status: false, message: `error of getting ${detailsUser.email}'s id` });
      } else {
        id1 = result.id;
        res.send({ status: true, message: "getting id success" });
      }
    });

    let sql2 = `INSERT INTO point(id_user) VALUES (${id1})`;
    db.query(sql2, (error) => {
      if (error) {
        res.send({ status: false, message: `error of getting ${detailsUser.email}'s point`  });
      } else {
        res.send({ status: true, message: `getting ${detailsUser.email}'s point is success`  });
      }
    });
  });

//selection des fichier au base de donner
app.get("/pub/:type", (req, res) => {
  let type = req.params.type;
  var sql = `SELECT * FROM pub WHERE type='${type}'`;
  db.query(sql, function (error, result) {
    if (result.data) {
      res.send({ status: false, message: "aucun fichier" });
    } else {
      res.send({ status: true, message: "files selected succefully", data: result });
    }
  });
});

// selection d'un element depuis base de donne
app.get("/select/:table/:id", (req, res) => {
  let table = req.params.table;
  let id = req.params.id;
  var sql = `SELECT * FROM ${table} WHERE id='${id}'`;
  db.query(sql, function (error, result) {
    if (result.data) {
      res.send({ status: false, message: "erreur de connection" });
    } else {
      res.send({ status: true, message: "connection valider", data: result });
    }
  });
});

// selection du tout contenu de table
app.get("/get/:table", (req, res) => {
  let table = req.params.table;
  var sql = `SELECT * FROM ${table}`;
  db.query(sql, function (error, result) {
    if (result.data) {
      res.send({ status: false, message: "erreur de connection" });
    } else {
      res.send({ status: true, message: "connection valider", data: result });
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
