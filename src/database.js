const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'votre_nom_utilisateur_mysql',
  password: 'votre_mot_de_passe_mysql',
  database: 'votre_base_de_donnees',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
