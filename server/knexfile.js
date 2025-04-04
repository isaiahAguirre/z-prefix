// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'inventory',
      user:     'postgres',
      password: 'docker',
      host:     '127.0.0.1',
      port: 5432
    }
  }

};
