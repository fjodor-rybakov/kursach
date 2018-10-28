const config  = require("./config"),
    restify = require("restify"),
    plugins = restify.plugins,
    rjwt = require('restify-jwt-community');

const server = restify.createServer({
    name: config.name,
    version: config.version
});

let database = config.db.get;

server.get("*", plugins.serveStatic({
    directory: "public", // раположение localhost(адрес)
    default: "index.html"
}));

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(plugins.authorizationParser());
server.use(rjwt(config.jwt).unless({
    path: ['/', '/dist/bundle.js']
}));

server.on("restifyError", (req, res, err, callback) => { // Обработка ошибок сервера
    return callback();
});

server.listen(config.port, () => { // Подключаемся к серверу
    console.log(`Server is listening on port ${config.port}`);
    require("./routes/routes")(server, database, config.jwt.secret);
});