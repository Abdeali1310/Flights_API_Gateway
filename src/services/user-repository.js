const { UserRepository, RolesRepository } = require("../repositories");
const { Auth, enums } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

const userRepo = new UserRepository();
const roleRepo = new RolesRepository();

const {CUSTOMER,ADMIN,FLIGHT_COMPANY} = enums.USER_ROLES;

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    const role = await roleRepo.getRoleByName(CUSTOMER)
    user.addRole(role)
    // console.log(role);
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

async function addRoleToUser(data){
  try {
    const user = await userRepo.get(data.id);
    if(!user){
      throw new AppError('No User found for given id',StatusCodes.NOT_FOUND);
    }

    const role = await roleRepo.getRoleByName(data.role)
    if(!role){
      throw new AppError('No User for given role',StatusCodes.NOT_FOUND)
    }
    user.addRole(role);
    return user;
  } catch (error) {
    if(error instanceof AppError) throw error;
    throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function isAdmin(id){
  try {
    const user = await userRepo.get(id);
    if(!user){
      throw new AppError('No User found for given id',StatusCodes.NOT_FOUND);
    }

    const adminRole = await roleRepo.getRoleByName(ADMIN)
    if(!adminRole){
      throw new AppError('No User for given role',StatusCodes.NOT_FOUND)
    }
    return user.hasRole(adminRole);
  } catch (error) {
    if(error instanceof AppError) throw error;
    throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports = {
  createUser,signIn,isAuthenticated,addRoleToUser,isAdmin,
};
