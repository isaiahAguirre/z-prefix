// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'Your stuff here',
      user:     'Your stuff here',
      password: 'Your stuff here',
      host:     'Your stuff here',
      port: 'Your stuff here'
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
