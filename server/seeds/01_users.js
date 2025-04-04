/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First_Name: 'Isaiah', Last_Name: 'Aguirre', Username: 'isaiahAguirre', Password: '1234'}
  ]);
};
