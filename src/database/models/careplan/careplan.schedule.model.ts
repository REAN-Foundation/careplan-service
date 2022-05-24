import { AssetTypeList, TimeSlotList } from '../../../domain.types/assets/asset.types';
import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class CareplanScheduleModel {

    static TableName = 'careplan_schedules';

    static ModelName = 'CareplanSchedule';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type         : Sequelize.UUID,
                allowNull    : false,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            AssetId : {
                type      : Sequelize.INTEGER,
                allowNull : false
            },
            AssetType : {
                type      : Sequelize.ENUM(AssetTypeList),
                allowNull : false
            },
            CareplanId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            Day : {
                type      : Sequelize.INTEGER,
                allowNull : false
            },
            TimeSlot : {
                type         : Sequelize.ENUM(TimeSlotList),
                allowNull    : false,
                defaultValue : 'Unspecified'
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = CareplanScheduleModel.Schema();

        return sequelize.define(
            CareplanScheduleModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : CareplanScheduleModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.CareplanSchedule.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
