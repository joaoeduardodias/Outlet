exports.up = function(knex) {
    return knex.schema.createTable('Products', (table) => {
        table.string('id').primary().notNullable()
        table.string('name').notNullable()
        table.string('description')
        table.float('price').notNullable()
        table.string('images')
        table.integer('amount').notNullable()



        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Products')
};