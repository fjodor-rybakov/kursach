const errs = require('restify-errors');

module.exports = (server, database) => {
    function isset() {
        const a = arguments, l = a.length;
        let i = 0;
        if (l === 0) {
            console.log('Empty isset');
        }

        while (i !== l) {
            if (typeof(a[i]) === 'undefined' || a[i] === null) {
                return false;
            } else {
                i++;
            }
        }
        return true;
    }

    /*function isUserExist(email, next) {
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
    });*/

    server.post("/v1/signUp", getSignUp);

    function getSignUp(req, res, next) {
        const data = JSON.parse(req.body);
        if (!isset(data.email, data.password)) {
            return next(new errs.InvalidArgumentError("Not enough body data"));
        }
        addUser(data, next)
            .then(() => {
                res.send("success");
            })
            .catch(() => {
                res.send("email is already exist");
            });
    }

    function addUser(data, next) {
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM user WHERE email = '${data.email}'`;
            database.query(sql, function (err, result) {
                if (err) {
                    return next(new errs.BadGatewayError(err));
                }
                if (result.length !== 0) {
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
    }
};
