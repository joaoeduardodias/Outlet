exports.up = function(knex) {
    return knex.schema.Table("Images", (table) => {
        table.renameColumn('id', 'id_image')
    })
};

exports.down = function(knex) {
    return knex.schema.Table("Images", (table) => {
        table.renameColumn('id_image', 'id')
    })
};