var jsonServer = require('json-server');
var path = require("path");



var dbFile = path.join(__dirname, 'db.json');
console.log(dbFile);


//Server-Config ::

var server = jsonServer.create();
var router = jsonServer.router(dbFile);
var middlewares = jsonServer.defaults();



// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/echo', function (req, res) {
    res.jsonp(req.query);
});


server.use(function (req, res, next) {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});


// Use default router
server.use(router);

var PORT = (process.env.PORT || 5000);

server.listen(PORT, function () {
    console.log('RETS-API ::is running at port: '+ PORT);
});