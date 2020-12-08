exports.up = function(knex) {
    return knex.schema.createTable('City', (table) => {
        table.string('id').primary().notNullable()
        table.string('name').notNullable()
        table.float('zip_code')
        table.string('id_State').notNullable()

        table.foreign('id_State')
            .references('id')
            .inTable('State')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('City')
};