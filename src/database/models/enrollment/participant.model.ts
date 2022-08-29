import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { GenderList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class ParticipantModel {

    static TableName = 'participants';

    static ModelName = 'Participant';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        DisplayId : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            unique        : true
        },
        Prefix : {
            type         : DataTypes.STRING(16),
            allowNull    : true,
            defaultValue : 'Mr'
        },
        FirstName : {
            type      : DataTypes.STRING(64),
            allowNull : false
        },
        LastName : {
            type      : DataTypes.STRING(64),
            allowNull : true
        },
        CountryCode : {
            type         : DataTypes.STRING(10),
            allowNull    : false,
            defaultValue : '+91'
        },
        Phone : {
            type      : DataTypes.STRING(16),
            allowNull : false
        },
        Email : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },
        ParticipantReferenceId : {
            type      : DataTypes.STRING(64),
            allowNull : true
        },
        Gender : {
            type         : DataTypes.ENUM({ values: GenderList }),
            allowNull    : false,
            defaultValue : 'Male'
        },
        BirthDate : {
            type      : DataTypes.DATE,
            allowNull : true
        },
        Country : {
            type      : DataTypes.STRING(64),
            allowNull : true
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ParticipantModel.ModelName,
        ParticipantModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParticipantModel.TableName,
        });
    
        static associate = (models) => {
            //Add associations here...
    
        };

}
