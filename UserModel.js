// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createUser(firstname, lastname) {
  return await knex('user').insert({ firstname, lastname });
}


module.exports = {
  createUser
};

// npm install knex sqlite3