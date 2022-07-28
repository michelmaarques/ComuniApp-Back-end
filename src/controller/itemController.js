const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const itens = await connection('itens').select('*');
        return response.json(itens);
    },

    async create(request, response) {
        try {
            const { nome, descricao, foto } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');

            await connection('itens').insert({
                id,
                nome,
                descricao,
                foto
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('itens').where('id', id).delete();
            return response.status(204).send();

        } catch (error) {

            return response.status(404).send("Não foi possivel excluir");
        }
    },

    async getItem(request, response) {
        const { id } = request.params;
        try {
            const item = await connection('itens').where('id', id).select('*');
            return response.json(item)

        } catch (error) {

            return response.status(404).send("Não foi possivel encontrar");
        }
    },
}