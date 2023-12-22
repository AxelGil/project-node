const pool = require('../database');

// Fonction pour créer un nouvel utilisateur dans la base de données
async function createUser(username, hashedPassword) {
  const [rows, fields] = await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  return rows.insertId;
}

// Fonction pour trouver un utilisateur par son nom d'utilisateur dans la base de données
async function findUserByUsername(username) {
  const [rows, fields] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

// Exportez les fonctions pour les utiliser dans d'autres fichiers
module.exports = { createUser, findUserByUsername };
