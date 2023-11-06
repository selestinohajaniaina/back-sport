const express = require('express');
const multer = require('multer'); // Middleware pour gérer les fichiers
const app = express();
const port = 3000;

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
