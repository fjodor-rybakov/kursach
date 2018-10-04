const errs = require('restify-errors');
const utils = require("../utils/utils");

module.exports = (server, database) => {
    const requestsDB = require("../requests/requests");

    server.post("/v1/signUp", getSignUp);

    function getSignUp(req, res, next) {
        const data = JSON.parse(req.body);
        if (!utils.isset(data.email, data.password)) {
            return next(new errs.InvalidArgumentError("Not enough body data"));
        }
        requestsDB.addUser(database, data, next)
            .then(() => {
                res.send("success");
            })
            .catch(() => {
                res.send("email is already exist");
            });
    }
};
