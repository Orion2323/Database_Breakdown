const jwt = require("jsonwebtoken");
const accessTokenSecret = "secret";

// method to authenticate a token
const authenticateJWT = (req,res,next) => {
    const authHeader = req.header.authorization;

    // check if user filled out authorization header
    if (authHeader != undefined) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token,accessTokenSecret, (err,user) => {
            if (err) {
                return res.status(403).json("Invalid token");
            }

            req.user = user;
        });
    }

    next();
}

// method to authenticate a token with claims
const authenticateWithClaims = (claims) => (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    // check if user filled out authorization header
    if (authHeader == undefined) {
        return res.status(401).json("Empty authorization header and token");
    } else {
        const token = authHeader.split(" ")[1];

        if (token == undefined) {
            return res.status(401).json("Enter a token");
        } else {
            jwt.verify(token,accessTokenSecret, (err,user) => {
                if (err) {
                    return res.status(403).json("Invalid token");
                }
    
                if (!user.claims.includes(claims)) {
                    return res.status(403).json("User does not have required claims");
                }
    
                req.user = user;
            });
        }
    }

    next();
}

const verifyTokenWithUser = (email) => (req,res,next) => {
    const authHeader = req.headers.authorization;

    // check if user filled out authorization header
    if (authHeader == undefined) {
        return res.status(401).json("Empty authorization header and token");
    } else {
        const token = authHeader.split(" ")[1];

        if (token == undefined) {
            return res.status(401).json("Enter a token");
        } else {
            const decodeToken = jtw.decode(token);
            console.log(decodeToken);
        }
    }

    next();
}

module.exports = {
    authenticateJWT, 
    authenticateWithClaims,
    verifyTokenWithUser
};