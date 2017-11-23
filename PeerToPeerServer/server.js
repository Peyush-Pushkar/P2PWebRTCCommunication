'use strict';
var chalk = require('chalk');
var ecstatic = require('ecstatic');
var http = require('http');
var WebSocketServer = require('ws').Server;

var HTTP_PORT = 8100;
http.createServer(ecstatic({
    root: __dirname,
})).listen(HTTP_PORT, function () {
    console.log(chalk.green('http server listening on port ' + HTTP_PORT));
});

