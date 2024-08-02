const { UserRepository } = require("../repositories");
const { Auth } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

const userRepo = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a User object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User with the respected email not found",StatusCodes.NOT_FOUND);
    }

    const passwordMatch = Auth.checkPassword(data.password, user.password);
    console.log('password match',passwordMatch);
    
    if (!passwordMatch) {
      throw new AppError("Password Incorrect",StatusCodes.BAD_REQUEST);
    }

    const jwt = Auth.generateJWT({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    // console.log(error);
    if(error instanceof AppError) throw error;
    throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT Token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepo.get(response.id)
        if(!user){
            throw new AppError('No User Found',StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT Token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT Token Expired',StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw error
    }
}

module.exports = {
  createUser,signIn,isAuthenticated
};
