const config  = require('./config'),
    restify = require('restify'),
    restifyErrors = require('restify-errors');

const server = restify.createServer({
    name: config.name,
    version: config.version
});

let database = config.db.get;

server.get('/*', restify.plugins.serveStatic({
    directory: './public', // раположение localhost(адрес)
    default: 'index.html'
}));

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.on('restifyError', (req, res, err, callback) => { // Обработка ошибок сервера
    return callback();
});

server.listen(config.port, () => { // Подключаемся к серверу
    console.log(`Server is listening on port ${config.port}`);
    require("./routes/routes")(server, database);
});