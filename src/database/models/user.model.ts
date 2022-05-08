import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserModel {

    static TableName = 'users';

    static ModelName = 'User';

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
            RoleId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            UserName : {
                type      : Sequelize.STRING(32),
                allowNull : false
            },
            Prefix : {
                type         : Sequelize.STRING(16),
                allowNull    : false,
                defaultValue : 'Mr'
            },
            FirstName : {
                type      : Sequelize.STRING(64),
                allowNull : false
            },
            LastName : {
                type      : Sequelize.STRING(64),
                allowNull : false
            },
            CountryCode : {
                type         : Sequelize.STRING(10),
                allowNull    : false,
                defaultValue : '+91'
            },
            Phone : {
                type      : Sequelize.STRING(16),
                allowNull : true
            },
            Email : {
                type      : Sequelize.STRING(256),
                allowNull : true
            },
            Gender : {
                type         : Sequelize.ENUM(["Male", "Female", "Other"]),
                allowNull    : false,
                defaultValue : 'Male'
            },
            BirthDate : {
                type      : Sequelize.DATE,
                allowNull : true
            },
            Password : {
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
        const schema = UserModel.Schema();

        return sequelize.define(
            UserModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : UserModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.User.belongsTo(models.Role, {
            sourceKey : 'RoleId',
            targetKey : 'id',
            as        : 'Role'
        });

    };

}
