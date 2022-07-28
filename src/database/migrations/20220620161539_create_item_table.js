/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('itens', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.string('foto').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('itens');
};
