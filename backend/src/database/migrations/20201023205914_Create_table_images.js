exports.up = function(knex) {
    return knex.schema.createTable("Images", (table) => {
        table.string('id_image').primary().notNullable()
        table.string('name')
        table.float('size')
        table.string('key')
        table.string('url')
        table.string('id_product')
        table.foreign('id_product')
            .references('id')
            .inTable('Products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Images')
};