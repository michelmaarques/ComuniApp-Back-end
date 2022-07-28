/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('instituicoes', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('endereco').notNullable();
        table.string('servicos').notNullable();
        table.string('contato').notNullable();
        table.integer('tipo').notNullable(); // 0 posto - 1 escola - 2 cras - 3 outros
        table.string('horarioAtendimento').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('instituicoes');
};
