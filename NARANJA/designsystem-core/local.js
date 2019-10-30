const port = process.env.PORT || 3000;

const server = require('./dist/server');

server.app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
