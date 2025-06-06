import { Sequelize } from 'sequelize';
import config from './config/config.js';


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port
});
export default sequelize;

async function testConnection() {
   try {
       await sequelize.authenticate();
       console.log('Connection has been established successfully.');
   } catch (error) {
       console.error('Unable to connect to the database:', error);
   }
}
testConnection();
