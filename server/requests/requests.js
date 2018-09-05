const restifyErrors = require('restify-errors');

module.exports = (server, database) => {
    database.query('SELECT 1 + 1 AS solution', (error, rows, fields) => {
        if (error) return next(restifyErrors.BadGatewayError(error.message));

        console.log('The solution is: ', rows[0].solution);
    });
};
