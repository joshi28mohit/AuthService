const express = require('express');
const { PORT } = require('./config/serverConfig');
const app = express();

const prepareAndStratServer = () => {
    app.listen(PORT, () => {
        console.log(`Server Started at port: ${PORT}`);
    });
}

prepareAndStratServer();