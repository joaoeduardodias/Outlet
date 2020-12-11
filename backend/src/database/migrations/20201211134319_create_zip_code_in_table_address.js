exports.up = function(knex) {
    return knex.schema.table('Address', (table) => {
        table.float('zip_code')
    })
};

exports.down = function(knex) {
    return knex.schema.table('Address', (table) => {
        table.dropColumn('zip_code')
    })
};