exports.up = function(knex) {
    return knex.schema.createTable('Products', (table) => {
        table.string('id').primary().notNullable()
        table.string('name').notNullable()
        table.string('description')
        table.float('price').notNullable()
        table.integer('amount').notNullable() // estoque
        table.boolean('available').defaultTo(1).notNullable()
        table.float('weight').defaultTo(0).notNullable()
        table.string('typeWeight').defaultTo('KG').notNullable()
        table.float('lenght').defaultTo(0).notNullable()
        table.float('width').defaultTo(0).notNullable()
        table.float('height').defaultTo(0).notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Products')
};