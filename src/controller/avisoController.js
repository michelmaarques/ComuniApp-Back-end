const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const avisos = await connection('avisos').select('*');
        return response.json(avisos);
    },

    async getAvisoAtivo(request, response) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        const data = date + "/" + month + "/" + year;
        const avisos = await connection('avisos').where('status', 'ativo').where('data', data).select('*');
        return response.json(avisos);
    },

    async create(request, response) {
        try {
            const { nome, descricao, idUser } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            const data = date + "/" + month + "/" + year;

            await connection('avisos').insert({
                id,
                nome,
                descricao,
                idUser,
                "data": data,
                "status": "ativo"
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('avisos').where('id', id).delete();
            return response.status(204).send();

        } catch (error) {

            return response.status(404).send("Não foi possivel excluir");
        }
    },

    async createAvisoEmail(request, response) {
        try {
            const { nome, descricao, email } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            const data = date + "/" + month + "/" + year;
            const [idUser] = await connection('users').where('email', email).select('id');

            await connection('avisos').insert({
                id,
                nome,
                descricao,
                "idUser": idUser.id,
                "data": data,
                "status": "ativo"
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },
}