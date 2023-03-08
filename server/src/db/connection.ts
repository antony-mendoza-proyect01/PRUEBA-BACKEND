import { Sequelize } from "sequelize";



const sequelize = new Sequelize ('rrhh', 'root','12345'  ,{
host:'localhost',
dialect:'mysql',
});

export default sequelize;