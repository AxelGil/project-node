// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createJob(name, job_type, companie, location, salary) {
  return await knex('job').insert({ name, job_type, companie, location, salary });
}

// Read
async function getAllJobs() {
  return await knex.select().from('job');
}

async function getJobById(id) {
  return await knex('job').where({ id }).first();
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};

// npm install knex sqlite3