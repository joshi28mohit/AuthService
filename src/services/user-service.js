const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async get(UserId){
        try {
            const response = await this.userRepository.getById(UserId);
            return response
        } catch (error) {
            throw error;
        }
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            // console.log("Service Error", error);
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong with the Service Layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
            const res = await this.userRepository.destroy(userId);
            return res;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            // Step - 1) fetch the user using email 
            const user = await this.userRepository.getByEmail(email);
            // Step - 2) compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordsMatch){
                console.log("Passowrd Doesn't match");
                throw {error: 'Incorrect password'};
            }
            // Step - 3) If password matches then create a token and send it to a user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            if(error.name == 'AttributeNotFound'){
                throw error;
            }
            console.log("Something went wrong in the sign in process");
            throw {error};
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong with the Token Creation");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong with the Token Validation", error);
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong with the password Comparision");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid Token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error};
        }
    }

}

module.exports = UserService;