const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const config = require('./config');
const websockets = require('./websockets');

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', path.resolve(__dirname, 'views'));

app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.get('/', (req, res) => res.render('index.html'));

const server = app.listen(config.app.PORT, () => {
    console.log(`Server running at port ${config.app.PORT}`);
});

const ws = websockets({
    server,
    path: '/ws'
});

ws.on('connection', socket => {
    socket.on('test', data => {
        console.log(data);
        socket.emit('test', 'hello from server');
    });
});
