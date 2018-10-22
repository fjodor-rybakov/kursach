const errs = require('restify-errors');

/*module.exports = (server, database) => {
    function isUserExist(email, next) {
        const sql = `SELECT * FROM user WHERE email = '${email}'`;
        database.query(sql, function (err, result) {
            if (err) {
                return next(new errs.BadGatewayError(err));
            }
            return (result.length !== 0);
        });
    }

    async function addUser(data, res, next) {
        if (await isUserExist(data.email, next)) {
            res = false;
            return;
        }

        const sql = `INSERT INTO user VALUES (null, '', '', 1, '', '${data.password}', '${data.email}', '')`;
        database.query(sql, function (err) {
            if (err) {
                return next(new errs.BadGatewayError(err));
            }
        });
        res = true;
    }

    server.post("/v1/signUp", (req, res, next) => {
        const data = JSON.parse(req.body);
        if (!isset(data.email, data.password)) {
            return next(new errs.InvalidArgumentError("Not enough body data"));
        }
        let success = false;
        addUser(data, success, next);
        if (success) {
            res.send("success")
        } else {
            res.send("email is already exist")
        }
    });
};*/

exports.addUser = function(database, data, next) {
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM user WHERE email = '${data.email}'`;
        database.query(sql, function (err, result) {
            if (err) {
                return next(new errs.BadGatewayError(err));
            }
            if (result.length === 0) {
                return reject(false);
            }
        });

        sql = `INSERT INTO user VALUES (null, '', '', 1, '', '${data.password}', '${data.email}', '')`;
        database.query(sql, function (err) {
            if (err) {
                return next(new errs.BadGatewayError(err));
            }
            return resolve(true);
        });
    });
};

exports.checkUser = function (database, data, next) {
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM user WHERE email = '${data.email}' AND password = '${data.password}'`;
        database.query(sql, function (err, result) {
            if (err) {
                return next(new errs.BadGatewayError(err));
            }
            if (result.length === 0) {
                return reject(undefined);
            } else {
                return resolve(data);
            }
        })
    })
};
