"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    //sino empieza con Bearer le damos ecceso denegado
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            //verify verificamos que el token no este corrupto ni haya expirado
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'algo123');
            next();
        }
        catch (error) {
            //401 no autorizado
            res.status(401).json({
                msg: 'Token no Valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso Denegado'
        });
    }
};
exports.default = validateToken;
