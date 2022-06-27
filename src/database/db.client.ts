import { MysqlClient as client } from './mysql.client';
import { Logger } from '../common/logger';
import { execSync } from 'child_process';

////////////////////////////////////////////////////////////////////////

export class DbClient {

    //Creates DB if does not exist
    public static createDatabase = async () => {
        try {
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

}

////////////////////////////////////////////////////////////////////////
