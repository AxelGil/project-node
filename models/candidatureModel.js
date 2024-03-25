// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createCandidature(id_user, id_job) {
  return await knex('candidature').insert({ id_user, id_job });
}

async function getAllCandidature() {
  return await knex.select().from('candidature');
}

async function getCandidatureById(id) {
  return await knex('candidature').where({ id }).first();
}

async function getCandidatureByUserId(id_user) {
  return await knex('candidature').where({ id_user });
}


module.exports = {
  createCandidature, 
  getAllCandidature,
  getCandidatureById,
  getCandidatureByUserId
};

// npm install knex sqlite3