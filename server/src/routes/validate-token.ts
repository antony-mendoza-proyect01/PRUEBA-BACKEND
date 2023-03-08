import { Request, Response, NextFunction} from "express";
import jwt  from "jsonwebtoken";

const validateToken = (req: Request, res:Response, next: NextFunction)=> {
    const headerToken = req.headers['authorization']
   
    //sino empieza con Bearer le damos ecceso denegado
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Tiene Token

        try{
            const bearerToken = headerToken.slice(7);
            //verify verificamos que el token no este corrupto ni haya expirado
            jwt.verify(bearerToken, process.env.SECRET_KEY|| 'algo123');
           next()
        }catch(error){
            //401 no autorizado
            res.status(401).json({
                msg:'Token no Valido'
            })
        }
    }else{
        res.status(401).json({
            msg:'Acceso Denegado'
        })
    }
   
}

export default validateToken;