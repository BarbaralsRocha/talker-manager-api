const crypto = require('crypto');
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
        return response.status(200).json([]);
    }
});

routes.get('/talker/:id', async (request, response) => {
        const { id } = request.params;
        const talker = await readTalker();
        const user = talker.find((u) => u.id === +id);
        if (!user) {
            return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
        return response.status(200).json(user);
});

routes.post('/login', 
middlewares.emailValidation, 
middlewares.passValidation, (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

routes.post('/talker', 
middlewares.tokenValidation, 
middlewares.nameValidation,
middlewares.ageValidation,
middlewares.talkValidation,
middlewares.watchetAtValidation,
middlewares.rateValidation,
async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = await readTalker();
    const id = talker.map((u) => u.id).length + 1;
    const newPerson = { name, age, id, talk: { watchedAt, rate } };
    await fs.writeFile('./talker.json', 
    JSON.stringify([...talker, newPerson]));
    return res.status(201).json(newPerson);
});

routes.put('/talker/:id', 
middlewares.tokenValidation, 
middlewares.nameValidation,
middlewares.ageValidation,
middlewares.talkValidation,
middlewares.watchetAtValidation,
middlewares.rateValidation,
async (request, response) => {
    const { id } = request.params;
    const getId = +id;
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const talker = await readTalker();
    const otherUsers = talker.filter((u) => u.id !== +id);
    await fs.writeFile('./talker.json',
    JSON.stringify([...otherUsers, { name, age, id: getId, talk: { watchedAt, rate } }]));
    return response.status(200).json({ name, age, id: getId, talk: { watchedAt, rate } });
});

routes.delete('/talker/:id', 
middlewares.tokenValidation, 
async (request, response) => {
    const { id } = request.params;
    const talker = await readTalker();
    const otherUsers = talker.filter((u) => u.id !== +id);
    await fs.writeFile('./talker.json',
    JSON.stringify(otherUsers));
    return response.status(204).end();
});

routes.use(middlewares.errorHandler);

module.exports = routes;
