import { Sequelize } from 'sequelize';
import { DbConfig } from './database.config';
import { Logger } from '../common/logger';
import { execSync } from 'child_process';
import { MysqlClient } from './mysql.client';

///////////////////////////////////////////////////////////////////////////////////

export class DatabaseConnector {

    private static _sequelize: Sequelize = null;

    static initialize = async () => {

        try {

            Logger.instance().log('environment : ' + process.env.NODE_ENV);
            Logger.instance().log('db name     : ' + DbConfig.config.database);
            Logger.instance().log('db username : ' + DbConfig.config.username);
            Logger.instance().log('db host     : ' + DbConfig.config.host);

            DatabaseConnector._sequelize = new Sequelize(
                DbConfig.config.database,
                DbConfig.config.username,
                DbConfig.config.password,
                {
                    host    : DbConfig.config.host,
                    dialect : 'mysql',
                    pool    : {
                        max     : DbConfig.config.pool.max,
                        min     : DbConfig.config.pool.min,
                        acquire : DbConfig.config.pool.acquire,
                        idle    : DbConfig.config.pool.idle
                    },
                    logging : false
                });
        
            // await DatabaseConnector.createDatabase();

            await DatabaseConnector._sequelize.authenticate();
            Logger.instance().log('Database connection has been established successfully.');

        } catch (error) {
            Logger.instance().log('Unable to connect to the database:' + error.message);
            return false;
        }
    }

    static db = () => {
        // if (false === DatabaseConnector._initialized) {
        //     (async () => {
        //         await DatabaseConnector.initialize();
        //         DatabaseConnector._initialized = true;
        //     })();
        // }
        return {
            Sequelize : Sequelize,
            sequelize : DatabaseConnector._sequelize
        };
    }

    //Creates DB if does not exist
    public static createDatabase = async () => {
        try {
            const client = DatabaseConnector.getClient();
            await client.createDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public static dropDatabase = async () => {
        try {
            const client = DatabaseConnector.getClient();
            await client.dropDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public static executeQuery = async (query: string) => {
        try {
            const client = DatabaseConnector.getClient();
            await client.executeQuery(query);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    public static migrate = async () => {
        try {
            const output = execSync('npx sequelize-cli db:migrate');

            const str = output.toString();
            Logger.instance().log('Database migrated successfully!');
            Logger.instance().log(str);

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    private static getClient() {
        return MysqlClient;
    }

}
