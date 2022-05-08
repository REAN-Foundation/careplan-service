import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class RolePrivilegeModel {

    static TableName = 'role_privileges';

    static ModelName = 'RolePrivilege';

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

            RoleId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true
            },

            RoleName : {
                type      : Sequelize.STRING(32),
                allowNull : true
            },
    
            Privilege : {
                type      : Sequelize.STRING(256),
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
        const schema = RolePrivilegeModel.Schema();

        return sequelize.define(
            RolePrivilegeModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : RolePrivilegeModel.TableName,
            });
    };

    static associate = (models) => {
    //Add associations here...
        models.RolePrivilege.belongsTo(models.Role, {
            sourceKey : 'RoleId',
            targetKey : 'id'
        });
    };

}
