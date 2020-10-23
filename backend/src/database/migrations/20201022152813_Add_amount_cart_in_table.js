exports.up = function(knex) {
    return knex.schema.table("User_Product", (table) => {
        table.renameColumn('amount', 'amount_cart')
    })
};

exports.down = function(knex) {
    return knex.schema.table("User_Product", (table) => {
        table.renameColumn('amount_cart', 'amount')
    })
};