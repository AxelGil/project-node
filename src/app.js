const express = require('express');
const bodyParser = require('body-parser');
const { register, login } = require('./controllers/authController');
const { authenticateToken } = require('./middlewares/authMiddleware');
const pool = require('./database');

const app = express();
const PORT = 3500;

// Utilise le middleware body-parser pour traiter les données JSON
//app.use(bodyParser.json());

// Définit le pool de connexions à la base de données comme une variable globale pour être utilisé par d'autres fichiers
//global.pool = pool;

// Route pour l'inscription d'un utilisateur
//app.post('/api/auth/register', register);

// Route pour la connexion d'un utilisateur
//app.post('/api/auth/login', login);

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Ceci est une route de test.' });
  });

// Exemple d'une route protégée nécessitant un jeton d'authentification
/*app.get('/api/private', authenticateToken, (req, res) => {
  res.json({ message: 'Ceci est une route protégée.' });
});*/

// Écoute sur le port spécifié
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
