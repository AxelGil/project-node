const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/User');

// Fonction pour gérer l'inscription d'un utilisateur
async function register(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà.' });
    }

    // Crée un nouvel utilisateur dans la base de données
    const userId = await createUser(username, hashedPassword);

    res.status(201).json({ userId, message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

// Fonction pour gérer la connexion d'un utilisateur
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Vérifie si le mot de passe est valide
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Crée un jeton JWT pour l'utilisateur
    const token = jwt.sign({ userId: user.id }, 'votre-cle-secrete', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

// Exportez les fonctions pour les utiliser dans d'autres fichiers
module.exports = { register, login };
