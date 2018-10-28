let mysql = require('mysql');

module.exports = {
    name: 'order task',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        get: mysql.createConnection({
            host     : 'localhost',
            port     : '3306',
            user     : 'root',
            password : 'qwerty123',
            database : 'site'
        })
    },
    "jwt": {
        "secret": "&@$!changeme!$@&"
    }
};
