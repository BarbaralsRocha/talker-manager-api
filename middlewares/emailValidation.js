const emailValidation = (req, res, next) => {
    console.log('loginValidation');
    const { email } = req.body;
    if (!email || email === '') {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    if (validateEmail === false) {
        res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = emailValidation;