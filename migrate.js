const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    const userExists = await knex.schema.hasTable('user');
    if (!userExists) {
      await knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
      });
      console.log('La table "user" a été créée avec succès.');
    } else {
      console.log('La table "user" existe déjà.');
    }

    const jobExists = await knex.schema.hasTable('job');
    if (!jobExists) {
      await knex.schema.createTable('job', table => {
        table.increments('id').primary();
        table.string('titre_poste');
        table.string('job_type');
        table.string('companie');
        table.string('location');
        table.string('salaire');
        table.integer('nb_postulant');
      });
      console.log('La table "job" a été créée avec succès.');
    } else {
      console.log('La table "job" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();