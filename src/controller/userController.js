const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        return response.json(users);
    },

    async create(request, response) {
        try {
            const { nome, email, tipo } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');

            await connection('users').insert({
                id,
                nome,
                email,
                tipo
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('users').where('id', id).delete();
            return response.status(204).send();
        } catch (error) {
            return response.status(404).send();
        }
    },

    async getForEmail(request, response) {
        const { email } = request.body;
        try {
            const user = await connection('users').where('email', email).select('*');
            return response.json(user);
        } catch (error) {
            return response.status(404).send("Não foi possivel buscar");
        }
    },
}