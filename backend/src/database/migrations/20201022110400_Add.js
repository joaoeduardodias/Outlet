exports.up = function(knex) {
    return knex.schema.table("Products", (table) => {
        table.boolean('available').defaultTo(1).notNullable() // disponibilidade

    })
};

exports.down = function(knex) {
    return knex.schema.dropColumn('available')
};