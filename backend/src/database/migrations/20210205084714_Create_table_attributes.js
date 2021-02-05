exports.up = function(knex) {
    return knex.schema.createTable('attributes', (table) => {
        table.string('id').primary().notNullable()
        table.string('type')
        table.string('option_one')
        table.string('option_two')
        table.string('option_three')
        table.string('option_for')
        table.string('id_product')
        table.foreign('id_product')
            .references('id')
            .inTable('Products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')


        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('attributes')
};