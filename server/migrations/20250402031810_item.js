/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('items', table =>{
    table.increments('id');
    table.integer('UserId');
    table.foreign('UserId').references('id').inTable('users').onDelete('CASCADE');
    table.string('Item_Name');
    table.string('Description');
    table.integer('Quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', table =>{
    table.dropForeign('UserId');
  }).then(() => {
    return knex.schema.dropTable('items')
  })
};
