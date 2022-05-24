import { DatabaseConnector } from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserOtpModel {

    static TableName = 'user_otp';

    static ModelName = 'UserOtp';

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
            Otp : {
                type      : Sequelize.STRING(10),
                allowNull : false,
            },
            Purpose : {
                type         : Sequelize.ENUM(["Login", "Verification"]),
                allowNull    : false,
                defaultValue : 'Login'
            },
            Channel : {
                type         : Sequelize.ENUM(["Mobile", "Email"]),
                allowNull    : false,
                defaultValue : 'Mobile'
            },
            Validated : {
                type         : Sequelize.BOOLEAN,
                allowNull    : false,
                defaultValue : false
            },
            ValidFrom : {
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
        const schema = UserOtpModel.Schema();

        return sequelize.define(
            UserOtpModel.ModelName,
            schema,
            {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : UserOtpModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.UserOtp.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
