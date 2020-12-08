

exports.up = function(knex) {
  return knex.schema.table("Products", (table)=>{
   table.dropColumn('images')
  })
};

exports.down = function(knex) {
   return knex.schema.table("Products", (table)=>{
      table.string('images')
     })
};
