exports.up = function(knex) {
    return knex.schema.createTable('User_Product', (table) => {
        table.string('id').notNullable()
        table.string('id_user').notNullable()
        table.string('id_product').notNullable()
        table.integer('amount').notNullable().defaultTo(1)
        table.float('value_total').notNullable()

        table.foreign('id_user')
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.foreign('id_product')
            .references('id')
            .inTable('Products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('User_Product')
};