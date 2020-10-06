exports.up = function(knex) {
    return knex.schema.createTable("Users", (table) => {
        table.string("id").primary().notNullable();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.integer("whatsapp").notNullable();
        table.string("password").notNullable();

        table.boolean("administrador").defaultTo(0);

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("Users");
};