var express = require('express');
var http = require('http');

const port = process.env.PORT || 8081;
const headerRefered = {};

var app = express();

//代理服务控制
function createProxy(host, port, prefix) {
    var proxy = express();
    proxy.all("*", (sreq, sres) => {
        //todo：检查用户登录
        var options = {
            host: host, // 这里是代理服务器
            port: port, // 这里是代理服务器端口
            path: (prefix || "") + sreq.url,
            method: sreq.method,
            headers: {}
        };

        for (var k in sreq.headers) {
            var lk = k.toLowerCase();
            if (headerRefered[lk]) continue;
            var v = sreq.headers[k];
            if (lk == "referer" || lk == "origin" || lk == "host") {
                v = v.replace(new RegExp(sreq.headers.host.replace(".", "\\."), "ig"), host);
            }
            options.headers[k] = v;
        }

        var req = http.request(options, res => {
            sres.writeHead(res.statusCode, res.headers);
            res.pipe(sres);
        });
        req.on('error', err => {
            sres.send("500:" + err.message);
        });
        sreq.pipe(req);
    });
    return proxy;
}
app.use("/proxy", createProxy("127.0.0.1", 8080));
app.use("/", createProxy("vca2018exhi.infinitysia.com", 80));

//服务器
var server = http.createServer(app);
//启动服务
server.listen(port);
console.log("Server started at " + port + " @ " + new Date());

process.on('uncaughtException', err => {
    console.log(err);
});