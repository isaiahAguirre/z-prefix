/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First_Name: 'Golgi', Last_Name: 'Apparatus', Username: 'gApp', Password: '$2b$10$Rmh./t3Do8BN1Oto6KPz..DsB7Uq4BQzNm/MkSEGMoMDm2uvDjxSa'}
  ]);
};
