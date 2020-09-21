exports.up = function(knex) {
    return knex.schema.createTable('Tokens', (table) => {
        table.string('id').primary().notNullable()
        table.string('token')
        table.integer('token_expired')
        table.string('user_id').notNullable()
        table.foreign('user_id')
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Tokens')
};