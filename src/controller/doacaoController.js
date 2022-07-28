const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const doacoes = await connection('doacoes').select('*');
        return response.json(doacoes);
    },

    async getDoacoesAtivas(request, response) {
        const doacoes = await connection('doacoes')
            .join('itens', 'doacoes.idItem', '=', 'itens.id')
            .where('status', 'ativo').select('*');
        return response.json(doacoes);
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
            const idItem = id;

            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            const data = date + "/" + month + "/" + year;
            const { contato, idUser } = request.body;
            const id2 = crypto.randomBytes(4).toString('HEX');

            await connection('doacoes').insert({
                "id": id2,
                "data": data,
                contato,
                "status": "ativo",
                idUser,
                "idItem": idItem
            })
            return response.json({ id });
        } catch (error) {
            return response.status(404).send("Erro ao adicionar")
        }
    },

    async createDoacaoEmail(request, response) {
        try {
            const { nome, descricao, foto, email, contato } = request.body;
            const [idUser] = await connection('users').where('email', email).select('id');
            const id = crypto.randomBytes(4).toString('HEX');

            await connection('itens').insert({
                id,
                nome,
                descricao,
                foto
            })
            const idItem = id;

            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            const data = date + "/" + month + "/" + year;
            const id2 = crypto.randomBytes(4).toString('HEX');

            await connection('doacoes').insert({
                "id": id2,
                "data": data,
                contato,
                "status": "ativo",
                "idUser": idUser.id,
                "idItem": idItem
            })
            return response.json({ id });
        } catch (error) {
            console.log(error)
            return response.status(404).send("Erro ao adicionar")
        }
    },
    async delete(request, response) {
        const { id } = request.params;
        try {
            await connection('doacoes').where('id', id).delete();
            return response.status(204).send();

        } catch (error) {

            return response.status(404).send("Não foi possivel excluir");
        }
    },
}