import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserLoginSessionModel {

    static TableName = 'user_login_sessions';

    static ModelName = 'UserLoginSession';

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
            IsActive : {
                type         : Sequelize.BOOLEAN,
                allowNull    : false,
                defaultValue : true
            },
            StartedAt : {
                type      : Sequelize.DATE,
                allowNull : false
            },
            ValidTill : {
                type      : Sequelize.DATE,
                allowNull : false
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = UserLoginSessionModel.Schema();

        return sequelize.define(
            UserLoginSessionModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : UserLoginSessionModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.UserLoginSession.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
