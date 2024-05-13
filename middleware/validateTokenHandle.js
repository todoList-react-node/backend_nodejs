const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const validateToken = async (rq, res, next) => {
  try {
    let token;
    let authHeader = rq.headers.Authorization || rq.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function (error, decoded) {
          if (error) {
            res.status(401).send("User is not authorized");
            throw new error();
          } else {
            rq.user = decoded.user;
            next();
          }
        }
      );
    }
    if (!token) {
      res.status(403).send("Token not exit in current time");
      throw new error();
    }
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = validateToken;
