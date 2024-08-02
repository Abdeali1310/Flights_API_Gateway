const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function signUp(req,res){
    try {
        console.log(req.body);
        
        const user = await UserService.createUser({
            email:req.body.email,
            password:req.body.password,
        });
        successResponse.data = user;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

module.exports = {
    signUp,
}