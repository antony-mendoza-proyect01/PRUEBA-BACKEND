"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const product_2 = require("./product");
const user_2 = require("./user");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        //dame el puerto y sino lo encontras dane 3001
        this.port = process.env.PORT || '3001';
        this.listen();
        //parseamos 
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto' + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_2.Product.sync();
                yield user_2.User.sync();
            }
            catch (error) {
                console.log('conexion erronea', error);
            }
        });
    }
}
exports.default = Server;
