const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const reports = await connection('reports').select('*');
        return response.json(reports);
    },

    async create(request, response) {
        try {
            const { descricao, idReportAviso, idReportItem } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');

            await connection('reports').insert({
                id,
                descricao,
                idReportAviso,
                idReportItem
            })
            if (idReportAviso !== "") {
                await connection('avisos').where('id', idReportAviso).update({
                    status: "reportado"
                });
            } else {
                await connection('doacoes').where('idItem', idReportItem).update({
                    status: "reportado"
                });
            }
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('reports').where('id', id).delete();
            return response.status(204).send();
        } catch (error) {
            return response.status(404).send("Não foi possivel excluir");
        }
    },

    async getById(request, response) {
        const { id } = request.params;
        try {
            const report = await connection('reports').where('id', id).first();
        } catch (error) {
            return response.status(404).send("Ocorreu um erro");
        }
    }

}