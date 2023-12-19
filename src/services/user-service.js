const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
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
            console.log("Something went wrong int the sign in process");
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
        }
    }

}

module.exports = UserService;