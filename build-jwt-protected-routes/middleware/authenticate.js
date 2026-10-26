import { verifyToken } from "../utils/jwt.js";
import { isBlacklisted } from "../utils/token-blacklist.js";

export default function authenticate(req, res, next){
    const authF = req.headers.authorization || "";
    if(!authF || !authF.startsWith("Bearer ")) {
        res.status(401).json({message:"No token provided"});
    }
    const token = authF.split(" ")[1];
    if(isBlacklisted(token)){
        return res.status(401).json({ message: "Token has been invalidated. Log in again."});
    }
    const verifiedT = verifyToken(token);
    if(!verifiedT){
        return res.status(401).json({ message: "Invalid or expired token"});
    }
    req.user = verifiedT;
    next();

}

