
exports.up = function(knex) {
   return knex.schema.table("City", (table) => {
      table.float('zip_code')

  })
};

exports.down = function(knex) {
   return knex.schema.dropColumn('zip_code')
  
};
