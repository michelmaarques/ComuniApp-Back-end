/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('paradas', function (table) {
        table.string('id').primary();
        table.string('endereco').notNullable();
        table.string('nome').notNullable();
        table.string('idLinha').notNullable();
        table.foreign('idLinha').references('id').inTable('onibus');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('paradas');
};
