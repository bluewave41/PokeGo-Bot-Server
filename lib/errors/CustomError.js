class CustomError extends Error {
    constructor(error, replace) {
        super(error);
        this.replace = replace;
        this.name = 'CustomError';
    }
}

module.exports = CustomError;