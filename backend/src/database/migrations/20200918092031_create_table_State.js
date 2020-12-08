exports.up = function(knex) {
    return knex.schema.createTable('State', (table) => {
        table.string('id').primary().notNullable()
        table.string('name').notNullable()
        table.string('uf').notNullable()
        table.string('id_country').notNullable()

        table.foreign('id_country')
            .references('id')
            .inTable('Country')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('State')
};