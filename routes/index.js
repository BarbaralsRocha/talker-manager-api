const express = require('express');
const fs = require('fs/promises');
const middlewares = require('../middlewares');

const routes = express.Router();

const readTalker = () => fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

routes.get('/talker', async (_, response) => {
    try {
        const talker = await readTalker();
        if (talker === []) {
            return response.status(200).json([]);
        }
        return response.status(200).json(talker);
    } catch (error) {
        response.status(200).json([]);
    }
});

routes.get('/talker/:id', async (request, response) => {
        const { id } = request.params;
        const talker = await readTalker();
        const user = talker.find((u) => u.id === +id);
        if (!user) {
            console.log('entrou');
            return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
        return response.status(200).json(user);
});

routes.use(middlewares.errorHandler);

module.exports = routes;
