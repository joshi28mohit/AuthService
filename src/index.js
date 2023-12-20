const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');

const db = require('./models/index');

// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');
// const verify = require('jsonwebtoken/verify');


const prepareAndStratServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));   
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started at port: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // const service = new UserService();
        // const newToken = service.createToken({email: 'panksj@admin.com', id: '1'});
        // console.log("new Token is", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbmtzakBhZG1pbi5jb20iLCJpZCI6IjEiLCJpYXQiOjE3MDI5ODUwOTUsImV4cCI6MTcwMjk4NTA5NX0.JTB87xTGCk4EJrtkhSwB192XY3EhtjeDTbm_S0o0Nuk';
        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStratServer();