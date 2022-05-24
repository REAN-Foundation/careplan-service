import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class CareplanModel {

    static TableName  = 'careplans';
    
    static ModelName  = 'Careplan';

    static Schema = () => {
        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type          : Sequelize.INTEGER,
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
            },
            Code : {
                type      : Sequelize.STRING(256),
                allowNull : false,
            },
            CategoryId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true,
                unique     : false,
            },
            Name : {
                type      : Sequelize.STRING(256),
                allowNull : false,
            },
            Description : {
                type      : Sequelize.TEXT,
                allowNull : true,
            },
            Version : {
                type         : Sequelize.STRING(32),
                allowNull    : false,
                defaultValue : '1.0.0',
            },
            OwnerUserId : {
                type       : Sequelize.UUID,
                allowNull  : true,
                foreignKey : true,
                unique     : false,
            },
            Tags : {
                type         : Sequelize.TEXT,
                allowNull    : false,
                defaultValue : '[]',
            },
            IsActive : {
                type         : Sequelize.BOOLEAN,
                allowNull    : false,
                defaultValue : true,
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE,
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = CareplanModel.Schema();

        return sequelize.define(
            CareplanModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : CareplanModel.TableName,
            });
    };

    static associate = (models) => {
        models.Careplan.belongsTo(models.CareplanCategory, {
            sourceKey : 'CategoryId',
            targetKey : 'id',
            as        : 'Category',
        });

        models.Careplan.belongsTo(models.User, {
            sourceKey : 'OwnerUserId',
            targetKey : 'id',
            as        : 'OwnerUser',
        });
    };

}
