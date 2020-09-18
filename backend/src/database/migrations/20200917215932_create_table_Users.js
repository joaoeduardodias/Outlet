
exports.up = function(knex) {
   return knex.schema.createTable('Users', (table) => {
       table.string('id').primary().notNullable()
       table.string('name').notNullable()
       table.string('email').notNullable()
       table.string('password').notNullable()
       table.integer('cpf').notNullable()
       table.date('date_birth').notNullable()
       table.boolean('administrador').notNullable().defaultTo(true)
       
  
       table.timestamp('created_at').defaultTo(knex.fn.now())
       table.timestamp('updated_at').defaultTo(knex.fn.now())
       
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('Users')
  };
  