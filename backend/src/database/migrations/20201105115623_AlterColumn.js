exports.up = function(knex) {
    return knex.schema.table("Images", (table) => {
        table.dropColumn('id_product')


        // table.string('id_product').notNullable()
        table.foreign('id_product')
            .references('id')
            .inTable('Products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')



    })
};

exports.down = function(knex) {
    return knex.schema.table("Images", (table) => {
        table.dropColumn('id_product')

    })
};