exports.up = function(knex) {
    return knex.schema.table("Products", (table) => {
        table.float('weight').defaultTo(0).notNullable()
        table.string('typeWeight').defaultTo('KG').notNullable()
        table.float('lenght').defaultTo(0).notNullable()
        table.float('width').defaultTo(0).notNullable()
        table.float('height').defaultTo(0).notNullable()

    })
};

exports.down = function(knex) {
    return knex.schema.table("Products", (table) => {
        table.dropColumn('weight')
        table.dropColumn('typeWeight')
        table.dropColumn('lenght')
        table.dropColumn('width')
        table.dropColumn('height')

    })
};