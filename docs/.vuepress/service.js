const express = require('express');
const server = express();

//设置跨域访问
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

const {createClient} = require('redis');
const client = createClient({
    url: ""
});
client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));
client.set('key', '100');


server.get('/api/getCount/:id', (req, res) => {
    let key = `blog:count:key:${req.params.id}`;
    client.get(key).then((t) => {
        res.send(t);
    });
});

server.post('/api/count/:id/:path', (req, res) => {
    let key = `blog:count:key:${req.params.id}`;
    let value = client.get(key);
    if (value) {
        client.set(key, value + 1)
    } else {
        client.set(key, 1)
    }
    res.send({'code': 200});
});

server.listen(8080);
