import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class RoleModel {

    static TableName = 'roles';

    static ModelName = 'Role';

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

            RoleName : {
                type      : Sequelize.STRING(32),
                allowNull : false
            },

            Description : {
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
        const schema = RoleModel.Schema();

        return sequelize.define(
            RoleModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : RoleModel.TableName,
            });
    };

    static associate = (models) => {
        //Add associations here...
        models.Role.hasMany(models.RolePrivilege);
    };

}
