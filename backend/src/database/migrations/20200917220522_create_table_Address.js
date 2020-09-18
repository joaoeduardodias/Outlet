
exports.up = function(knex) {
   return knex.schema.createTable('Address', (table) => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
      table.integer('neighborhood').notNullable()
      table.integer('street').notNullable()
      table.integer('number').notNullable()
      table.string('id_city').notNullable()
      table.string('id_users').notNullable()

      table.foreign('id_city')
      .references('id')
      .inTable('City')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.foreign('id_users')
      .references('id')
      .inTable('Users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      
   })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Address')
};
