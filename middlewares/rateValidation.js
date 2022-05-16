const rangesValues = (rate) => rate < 0 || rate > 6 || rate === 0;

const rateValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if ((!rate && rate !== 0) || rate === '') {
        return res.status(400).json({ message: 
            'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    if (rangesValues(rate)) {
        return res.status(400).json({ message: 
            'O campo "rate" deve ser um inteiro de 1 à 5', 
        });
    }
    next();
};

module.exports = rateValidation;