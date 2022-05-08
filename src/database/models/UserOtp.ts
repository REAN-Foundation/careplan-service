import { DatabaseConnector } from '../database.connector';

const db = DatabaseConnector.db();
const Sequelize: any = db.Sequelize;
const sequelize = db.sequelize;

////////////////////////////////////////////////////////////////////////

export var TableName = 'user_otp';
export var ModelName = 'UserOtp';

export const Schema = {
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

////////////////////////////////////////////////////////////////////////

export var Model: any = sequelize.define(ModelName, Schema, {
    createdAt       : 'CreatedAt',
    updatedAt       : 'UpdatedAt',
    deletedAt       : 'DeletedAt',
    freezeTableName : true,
    timestamps      : true,
    paranoid        : true,
    tableName       : TableName
});

Model.associate = (models) => {
    //Add associations here...

    models.UserOtp.belongsTo(models.User, {
        sourceKey : 'UserId',
        targetKey : 'id',
        as        : 'User'
    });

};
