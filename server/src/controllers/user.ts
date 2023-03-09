import {Request, Response} from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/user';
import jwt from 'jsonwebtoken'

export const newUser =  async (req : Request, res: Response) => {

 const{username, password} = req.body;

 //Validamos si el usuario ya existe en la base de datos
 const user = await User.findOne({where: {username: username} })

// seria el reemplazo de esto: SELECT * FROM USER WHERE USARNAME = PARAMETRO

if(user){
 return res.status(400).json({
    msg:`ya existe un usario con el nombre ${username}`
  })
}

const hashedPassword  = await bcrypt.hash(password, 10);

try{
  //Guardamos usuario en la base de datos
  await User.create({
    username: username,
    password: hashedPassword
  })
  res.json({
      msg: `Usuario ${username} creado Exitosamente! `
  })

}catch(error){
  res.status(400).json({
    msg:'upps ocurrio un error',
    error
  })
}


}

export const loginUser = async  (req : Request, res: Response) => {

  const{username,password} = req.body;
    

//Validamos si el usuario existe en la base de datos 
const user: any = await User.findOne({where: {username :  username}});

if(!user){
return res.status(400).json({
  msg:  `No existe un usuario con el nombre ${username} en la base de datos `
})
}
//Validamos contraseña

const passwordValid = await bcrypt.compare(password, user.password)
console.log(passwordValid)
if(!passwordValid){
return res.status(400).json({
  msg:`password incorrecto `
})
}

//Generamos Token
const token = jwt.sign({
  username: username
},process.env.SECRET_KEY|| 'antony123');

res.json({token});
}
