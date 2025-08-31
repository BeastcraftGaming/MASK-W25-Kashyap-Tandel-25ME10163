const fs = require("fs");

// password criteria
const passwordCriteria = {
    minLength: 6,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
};

const users = {};

function signup(username, password){
    if(users[username]){
        // user exists
        return { success: false, message: "User already exists" };
    }
    
    if (!checkPasswordVal(password).valid) {
        return { success: false, message: checkPasswordVal(password).message };
    }

    users[username] = { password };

    if (username.toLowerCase() === "dio") {console.log("KONO DIO DA!!");}
    
    return { success: true, message: "User registered successfully" };
}

function login(username, password){
    if(!users[username]){
        // user doesn't exist redirect to signup page if there

        return { success: false, message: "User does not exist" };
    }

    if(users[username].password !== password){ // case sensitive
        // incorrect password
        return { success: false, message: "Incorrect password" };
    }

    return { success: true, message: "Login successful" };
}

function checkPasswordVal(password){

    if(password.length < passwordCriteria.minLength || password.length > passwordCriteria.maxLength){
        return { valid: false, message: "Password must be between 8 and 20 characters long." };
    }

    if(passwordCriteria.requireUppercase && !/[A-Z]/.test(password)){
        return { valid: false, message: "Password must contain at least one uppercase letter." };
    }

    if(passwordCriteria.requireLowercase && !/[a-z]/.test(password)){
        return { valid: false, message: "Password must contain at least one lowercase letter." };
    }

    if(passwordCriteria.requireNumber && !/[0-9]/.test(password)){
        return { valid: false, message: "Password must contain at least one number." };
    }

    if(passwordCriteria.requireSpecial && !/[!@#$%^&*]/.test(password)){
        return { valid: false, message: "Password must contain at least one special character." };
    }

    return { valid: true };
}