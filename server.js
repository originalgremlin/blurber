var md5 = require('md5'),
    og = require('open-graph'),
    redis = require('redis'),
    restify = require('restify'),
    server = restify.createServer(),
    util = require('util');

server.use(restify.CORS({
    origins: ['http://localhost', 'https://im.arrowfs.org']
}));
server.use(restify.queryParser());

server.get('/url', function respond(req, res, next) {
    var url = req.query.id,
        key = util.format('blurb:url:%s', md5(url));

    client.get(key, function(err, reply) {
        // reply is null when the key is missing
        console.log(reply);
    });

    og(req.query.id, function (err, meta) {
        if (err) {
            console.err(err);
            res.send(err);
        } else {
            res.send(meta);
        }
    })
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
