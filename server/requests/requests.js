const errs = require('restify-errors');

module.exports = (server, database) => {

    // function isset() {
    //     const a = arguments, l = a.length;
    //     let i = 0;
    //     if (l === 0) {
    //         console.log('Empty isset');
    //     }
    //
    //     while (i !== l) {
    //         if (typeof(a[i]) === 'undefined' || a[i] === null) {
    //             return false;
    //         } else {
    //             i++;
    //         }
    //     }
    //     return true;
    // }

    // function isUserExist(email, next) {
    //     const sql = `SELECT * FROM user WHERE email = '${email}'`;
    //     database.query(sql, function (err, result) {
    //         if (err) {
    //             return next(new errs.BadGatewayError(err));
    //         }
    //         console.log(result);
    //         return (result.length !== 0);
    //     });
    // }

    // async function addUser(data, next) {
    //     if (await isUserExist(data.email, next)) {
    //         return false;
    //     }
    //
    //     const sql = `INSERT INTO user VALUES (null, '', '', 1, '', '${data.password}', '${data.email}', '')`;
    //     database.query(sql, function (err) {
    //         if (err) {
    //             return next(new errs.BadGatewayError(err));
    //         }
    //     });
    //     return true;
    // }

    // server.post("/v1/signUp", (req, res, next) => {
    //     const data = JSON.parse(req.body);
    //     if (!isset(data.email, data.password)) {
    //         return next(new errs.InvalidArgumentError("Not enough body data"));
    //     }
    //     if (addUser(data, next)) {
    //         res.send("success")
    //     } else {
    //         res.send("email is already exist")
    //     }
    // });
    function isCorrectUserData(data, next, user) {
        console.log("correct");
        const sql = `SELECT * FROM user WHERE (password = '${data.password}' and email = '${data.email}')`;
        // database.query(sql, function (err, res) {
        //     console.log("res: ", res);
        //     if (err) {
        //         return next(new errs.BadGatewayError(err));
        //     }
        //     if (res.length !== 0) {
        //         console.log(res);
        //         resolve(res[0]);
        //
        //     }
        //     return [];
        // });

        return new Promise((resolve, reject) => {
            database.query(sql, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res[0]);
            });
        });
    }

    function SendRes(data, res) {
        console.log("send");
        if (data.length !== 0) {
            res.send(data)
        } else {
            res.send("user not found")
        }
    }

    server.post("/v1/signIn", async (req, res, next) => {
        const data = JSON.parse(req.body);
        const value = await isCorrectUserData(data, next);
        SendRes(value, res);
    });
};
