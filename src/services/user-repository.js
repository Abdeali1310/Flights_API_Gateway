const { UserRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

const userRepo = new UserRepository()

async function createUser(data){
    try {
        const user = await userRepo.create(data)
        return user;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || 'SequelizeUniqueConstraintError')
        {
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a User object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createUser,
}