import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class ActionPlanModel {

    static TableName = 'asset_action_plans';

    static ModelName = 'ActionPlan';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type          : Sequelize.INTEGER,
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true
            },
            AssetCode : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Name : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Description : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'ActionPlan'
            },
            OwnerUserId : {
                type      : Sequelize.UUID,
                allowNull : true
            },
            Tags : {
                type         : Sequelize.TEXT,
                allowNull    : false,
                defaultValue : []
            },
            Version : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'V1'
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = ActionPlanModel.Schema();

        return sequelize.define(
            ActionPlanModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : ActionPlanModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

    };

}
