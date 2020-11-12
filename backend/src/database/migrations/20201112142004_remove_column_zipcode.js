exports.up = function(knex) {
    return knex.schema.table("City", (table) => {
        table.dropColumn('zip_code')

    })
};

exports.down = function(knex) {
    return knex.schema.table("City", (table) => {
        table.integer('zip_code').notNullable()

    })
};