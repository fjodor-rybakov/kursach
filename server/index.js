const config  = require('./config'),
    restify = require('restify');

const server = restify.createServer({
    name: config.name,
    version: config.version
});

server.get('/*', restify.plugins.serveStatic({
    directory: './public', // раположение localhost(адрес)
    default: 'index.html'
}));

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.port, () => { // Подключаемся к серверу
    console.log(`Server is listening on port ${config.port}`);
});