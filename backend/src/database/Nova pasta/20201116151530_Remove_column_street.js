exports.up = function(knex) {
    return knex.schema.table("Address", (table) => {
        table.dropColumn('street')

    })
};

exports.down = function(knex) {
    return knex.schema.table("Address", (table) => {
        table.integer('street')

    })
};