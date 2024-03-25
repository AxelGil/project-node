// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createUser(firstname, name) {
  return await knex('user').insert({ firstname, name });
}

async function getUserByName(firstname, name) {
  return await knex('user').where({ firstname, name }).first();
}


module.exports = {
  createUser,
  getUserByName
};

// npm install knex sqlite3