import { DatabaseConnector } from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserRoleModel {

    static TableName = 'user_roles';

    static ModelName = 'UserRole';

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
            UserId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            RoleId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

static Model: any = () => {

    const db = DatabaseConnector.db();
    const sequelize = db.sequelize;
    const schema = UserRoleModel.Schema();

    return sequelize.define(
        UserRoleModel.ModelName,
        schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserRoleModel.TableName,
        });
};

static associate = (models) => {

    //Add associations here...

    models.UserRole.belongsTo(models.User, {
        sourceKey : 'UserId',
        targetKey : 'id',
        as        : 'User'
    });

    models.UserRole.belongsTo(models.Role, {
        sourceKey : 'RoleId',
        targetKey : 'id',
        as        : 'Role'
    });

};

}
