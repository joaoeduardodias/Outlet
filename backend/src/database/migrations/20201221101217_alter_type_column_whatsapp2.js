exports.up = function(knex) {
    return knex.schema.table('Users', (table) => {
        table.float('whatsapp')
    })
};

exports.down = function(knex) {
    return knex.schema.table('Users', (table) => {
        table.dropColumn('whatsapp')
    })
};