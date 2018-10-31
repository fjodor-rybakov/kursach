const errs = require('restify-errors'),
    utils = require("../utils/utils"),
    requestsDB = require("../requests/requests"),
    jwt = require('jsonwebtoken');

module.exports = (server, database, secret) => {
    server.post("/api/signUp", getSignUp);
    server.post("/api/signIn", getSignIn);
    server.post("/api/profile", getProfile);
    server.get("/api/getProjects", getProjectList);
    server.post("/api/getProject", getProject);

    function getProfile(req, res, next) {
        const data = JSON.parse(req.body);
        requestsDB.getProfile(database, data, next)
            .then((data) => {
                res.send(data[0]);
            })
            .catch(() => {
                res.send("err");
            });
    }

    function getProject(req, res, next) {
        const data = JSON.parse(req.body);
        requestsDB.getProject(database, data, next)
            .then((data) => {
                res.send(data);
            })
            .catch(() => {
                res.send("err");
            });
    }

    function getProjectList(req, res, next) {
        requestsDB.getProjects(database, next)
            .then((data) => {
                res.send(data);
            })
            .catch(() => {
                res.send("err");
            });
    }

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

    function getSignIn(req, res, next) {
        const data = JSON.parse(req.body);
        if (!utils.isset(data.email, data.password)) {
            return next(new errs.InvalidArgumentError("Not enough body data"));
        }
        requestsDB.checkUser(database, data, next)
            .then((data) => {
                console.log(data);
                let token = jwt.sign(data, secret, {
                    expiresIn: '1m'
                });
                let {iat, exp} = jwt.decode(token);
                res.send({iat, exp, token})
            })
            .catch(() => {
                return next(new errs.InvalidArgumentError("Unknown user"));
            });
    }
};
