const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const instituicoes = await connection('instituicoes').select('*');
        return response.json(instituicoes);
    },

    async getInstTipo(request, response) {
        try {
            const { tipo } = request.params;
            const inst = await connection('instituicoes').where('tipo', tipo).select('*');
            return response.json(inst);
        } catch (error) {
            return response.status(404).send("erro ao buscar dados")
        }
    },

    async create(request, response) {
        try {
            const { nome, endereco, servicos, contato, tipo, horarioAtendimento } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
            await connection('instituicoes').insert({
                id,
                nome,
                endereco,
                servicos,
                contato,
                tipo,
                horarioAtendimento
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('instituicoes').where('id', id).delete();
            return response.status(204).send();

        } catch (error) {

            return response.status(404).send("Não foi possivel excluir");
        }
    },
    async update(request, response) {
        try {
            const { id, nome, endereco, servicos, contato, tipo, horarioAtendimento } = request.body;
            await connection('instituicoes').where('id', id).update({
                id,
                nome,
                endereco,
                servicos,
                contato,
                tipo,
                horarioAtendimento
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },
}