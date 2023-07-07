const CustomError = require("../error/CustomError");

const userAuthMiddleware = async (req, res, next) => {
    if (!req.user) {
        throw new CustomError({
            status: 401,
            message: "User is not logged in",
        })
    }

    next();
}

module.exports = userAuthMiddleware;