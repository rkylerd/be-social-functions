const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

if (!secret) {
  console.log("You need to define a JWT_SECRET environment variable to continue.");
  process.exit();
}

// Generate a token
const generateToken = (data, expires) => {
  return jwt.sign(data, secret, {
    expiresIn: expires
  });
};

// Verify the token that a client gives us.
// This is setup as middleware, so it can be passed as an additional argument to Express after
// the URL in any route. This will restrict access to only those clients who possess a valid token.
const verifyToken = ({ token = "" }) => {
    try {
        if (!token) {
            return {
                statusCode: 403,
                error: "No token provided."
            }
        }
        const decoded = jwt.verify(token, secret);
        // save user id
        return {
            user_id: decoded.id,
            token
        } 
    } catch (error) {
      console.log(error, "error from verifyToken()")
        return {
            statusCode: 403,
            error: "No token provided."
        }
    }   
}

const removeOldTokens = (tokens) => {
  return tokens.filter(token => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  });
}

module.exports = {
  generateToken,
  verifyToken,
  removeOldTokens
};
