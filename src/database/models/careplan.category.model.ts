import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class CareplanCategoryModel {

    static TableName = 'careplan_categories';

    static ModelName = 'CareplanCategory';

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
            Type : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Description : {
                type      : Sequelize.STRING(512),
                allowNull : true
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = CareplanCategoryModel.Schema();

        return sequelize.define(
            CareplanCategoryModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : CareplanCategoryModel.TableName,
            });
    };

    static associate = (models) => {
        //Add associations here...
    };

}
