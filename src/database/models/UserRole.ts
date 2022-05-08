import { DatabaseConnector } from '../database.connector';

const db = DatabaseConnector.db();
const Sequelize: any = db.Sequelize;
const sequelize = db.sequelize;

////////////////////////////////////////////////////////////////////////

export var TableName = 'user_roles';
export var ModelName = 'UserRole';

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

////////////////////////////////////////////////////////////////////////
