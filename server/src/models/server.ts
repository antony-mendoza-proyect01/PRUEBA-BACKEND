 import express, { Application } from 'express';
import cors from 'cors'
 import routerProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product';
import { User } from './user';

  class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        //dame el puerto y sino lo encontras dane 3001
        this.port = process.env.PORT || '3001';
        this.listen();
        //parseamos 
        this.midlewares();
        this.routes();
    
    }
    listen(){
        this.app.listen(this.port, ( )=>{
            console.log('Aplicacion corriendo en el puerto'+ this.port);
        })
    }
    routes(){
        this.app.use('/api/products',routerProduct);
        this.app.use('/api/users', routesUser);
    }

     midlewares(){
        //Parseo Body
        this.app.use(express.json())
        //Cors
        this.app.use(cors());
    }

    async dbConnect(){
        try{
                await Product.sync();
                await User.sync();
        }catch (error){
                console.log('conexion erronea',error);
        }

    }


}

export default Server;