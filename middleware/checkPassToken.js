const checkPassToken = (rq, res, next) => {
  try {
    let token;
    let authHeader = rq.headers.Authorization || rq.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
  } catch (error) {}
};
module.exports = checkPassToken;
