exports.up = function(knex) {
    return knex.schema.table("User_Product", (table) => {
        table.renameColumn('amount_cart', 'amount_sold')
        table.renameColumn('id', 'id_sold')
    })
};

exports.down = function(knex) {
    return knex.schema.table("User_Product", (table) => {
        table.renameColumn('id_sold', 'id')
        table.renameColumn('amount_sold', 'amount')
    })
};