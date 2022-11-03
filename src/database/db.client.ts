import { MysqlClient } from './mysql.client';
import { PostgresqlClient } from './postgresql.client';
import { Logger } from '../common/logger';
import { execSync } from 'child_process';
////////////////////////////////////////////////////////////////////////

export class DbClient {

    private client = this.getClient();

    //Creates DB if does not exist
    public createDatabase = async () => {
        try {
            //const client = this.getClient();
            await this.client.createDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public dropDatabase = async () => {
        try {
            await this.client.dropDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public executeQuery = async (query: string) => {
        try {
            await this.client.executeQuery(query);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    public migrate = async () => {
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

    public getDialect(flavour) {

        let dialect = 'postgres';

        if (flavour === 'mysql') {
            dialect = flavour;
        }
        else if (flavour === 'postgres') {
            dialect = flavour;
        } else {
            throw new Error('Please give DATABASE_DIALECT either mysql or postgres');
        }

        return dialect;
    }

    private getClient() {

        const flavour = this.getDialect(process.env.DATABASE_DIALECT);

        if (flavour === 'mysql') {
            return MysqlClient;
        }
        if (flavour === 'postgres') {
            return PostgresqlClient;
        }
        return MysqlClient;
    }

}

////////////////////////////////////////////////////////////////////////
