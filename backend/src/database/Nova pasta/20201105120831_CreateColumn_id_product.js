exports.up = function(knex) {
    return knex.schema.table("Images", (table) => {
        table.string('id_product')

    })
};

exports.down = function(knex) {
    return knex.schema.table("Images", (table) => {
        table.dropColumn('id_product')

    })
};