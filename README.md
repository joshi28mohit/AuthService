# AuthService

## Authentication
It is a process using which we can uniquely identify users in our application. This process tells us about who the user is. The general Sinup/login/logout flow is used to authenticate a user.

## Authorisation
It is a process using which, we can identify the capabilities of a user i.e. what a user can do in our application. It is more about the roles.

## How to do Authentication
    - Mobile Number - OTP or a link in mobile
    - Omniauth(gmail, fb, github) - 3rd party service is handling the authentication
    - Token Based (We use JWT - JSON Web Token in this method) - To generate the JW Token, we actually use the client credentials. 
