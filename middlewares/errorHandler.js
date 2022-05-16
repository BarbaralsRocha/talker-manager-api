const errorHandler = (error, _req, res, _next) => {
    console.log('erro');
    return res.status(error.status || 500).json({ message: error.message });
};

module.exports = errorHandler;