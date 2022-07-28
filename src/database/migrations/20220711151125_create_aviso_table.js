/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('avisos', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.string('data').notNullable();
        table.string('idUser').notNullable();
        table.string('status').notNullable();

        table.foreign('idUser').references('id').inTable('users');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('avisos');
};
