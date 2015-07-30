var cache = require('./cache'),
    og = require('open-graph'),
    restify = require('restify'),
    server = restify.createServer();

// middleware
server.use(restify.CORS());
server.use(restify.queryParser());

// endpoints
server.get('/url', function respond(req, res, next) {
    var url = req.query.id;
    if (cache.has(url)) {
        res.send(cache.get(url).blurb);
    } else {
        og(url, function (err, blurb) {
            if (err) {
                console.err(err);
                res.send(err);
            } else {
                cache.set(url, { blurb: blurb, date: new Date(), url: url });
                res.send(blurb);
            }
        });
    }
});

// start server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
