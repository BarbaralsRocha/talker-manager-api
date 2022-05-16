const errorHandler = require('./errorHandler');
const emailValidation = require('./emailValidation');
const passValidation = require('./passValidation');
const tokenValidation = require('./tokenValidation');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const talkValidation = require('./talkValidation');
const watchetAtValidation = require('./watchetAtValidation');
const rateValidation = require('./rateValidation');

module.exports = { 
    errorHandler,
    emailValidation,
    passValidation,
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchetAtValidation,
    rateValidation,
 };