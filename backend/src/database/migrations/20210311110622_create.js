// exports.up = function (knex) {
//   return knex.schema.createTable("Orders", (table) => {
//     table.string("id_order").primary().notNullable();
//     table.jsonb("ids_sold");
//     table
//       .foreign("id_user")
//       .references("id")
//       .inTable("Users")
//       .onDelete("CASCADE")
//       .onUpdate("CASCADE");

//     table.timestamp("created_at").defaultTo(knex.fn.now());
//     table.timestamp("updated_at").defaultTo(knex.fn.now());
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTable("Orders");
// };
