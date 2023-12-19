const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');

// const UserRepository = require('./repository/user-repository');


const prepareAndStratServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));   
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started at port: ${PORT}`);
        // const userRepository = new UserRepository();
        // const result = await userRepository.getById(1);
        // console.log(result);
    });
}

prepareAndStratServer();