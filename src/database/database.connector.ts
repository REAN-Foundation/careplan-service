import { Sequelize } from 'sequelize';
import { DbConfig } from './database.config';
import { Logger } from '../common/logger';

///////////////////////////////////////////////////////////////////////////////////

const config = DbConfig.config;

Logger.instance().log('environment : ' + process.env.NODE_ENV);
Logger.instance().log('db name     : ' + config.database);
Logger.instance().log('db username : ' + config.username);
Logger.instance().log('db host     : ' + config.host);

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host    : config.host,
    dialect : 'mysql',
    pool    : {
        max     : config.pool.max,
        min     : config.pool.min,
        acquire : config.pool.acquire,
        idle    : config.pool.idle
    },
    logging : false
});

sequelize
    .authenticate()
    .then(() => {
        Logger.instance().log('Database connection has been established successfully.');
    })
    .catch(error => {
        Logger.instance().log('Unable to connect to the database:' + error.message);
    });

/////////////////////////////////////////////////////////////////////////////////////////

//Creates DB if d
export default {
    Sequelize : Sequelize,
    sequelize : sequelize
};

///////////////////////////////////////////////////////////////////////////////////
