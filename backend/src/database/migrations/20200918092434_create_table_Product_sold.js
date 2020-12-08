exports.up = function(knex) {
    return knex.schema.createTable('Products_sold', (table) => {
        table.string('id').primary().notNullable()
        table.string('id_user_product').notNullable()

        table.foreign('id_user_product')
            .references('id_sold')
            .inTable('User_Product')



        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Products_sold')
};