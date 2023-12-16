import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class DailyStatisticsModel {

    static TableName = 'daily_statistics';

    static ModelName = 'DailyStatistics';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        ReportDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        ReportTimestamp : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        Statistics : {
            type      : DataTypes.TEXT,
            allowNull : false
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        DailyStatisticsModel.ModelName,
        DailyStatisticsModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : DailyStatisticsModel.TableName,
        });

    static associate = () => {

        //Add associations here...

    };

}
