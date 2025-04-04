/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {UserId: 1, Item_Name: 'Mitochondria', Description: 'The powerhouse of the cell', Quantity: 1},
    {UserId: 1, Item_Name: 'the CELL WALL', Description: 'The WALL of the CELL', Quantity: 1}
  ]);
};
