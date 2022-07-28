/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('doacoes', function (table) {
        table.string('id').primary();
        table.string('idUser').notNullable();
        table.string('idItem').notNullable();
        table.string('data').notNullable();
        table.string('contato').notNullable();
        table.string('status').notNullable();

        table.foreign('idUser').references('id').inTable('users');
        table.foreign('idItem').references('id').inTable('itens');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('doacoes');
};
