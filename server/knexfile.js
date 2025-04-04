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
    //Just in case, here is what I used for everthing. For if you'd prefer to change your database to what's in the code rather than change the code.
    // connection: {
    //   database: 'inventory',
    //   user:     'postgres',
    //   password: 'docker',
    //   host:     '127.0.0.1',
    //   port: 5432
    // }
  }

};
