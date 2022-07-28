/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('reports', function (table) {
        table.string('id').primary();
        table.string('descricao').notNullable();
        table.string('idReportAviso').notNullable();
        table.string('idReportItem').notNullable();

        table.foreign('idReportAviso').references('id').inTable('avisos');
        table.foreign('idReportItem').references('id').inTable('itens');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('reports');
};
