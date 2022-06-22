import { BiometricsTypeList } from '../../../domain.types/assets/biometrics.domain.types';
import { DatabaseConnector } from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class BiometricsModel {

    static TableName = 'asset_biometrics';

    static ModelName = 'Biometrics';

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
            AssetCode : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Name : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Description : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'Biometrics'
            },
            BiometricsType : {
                type         : Sequelize.ENUM(BiometricsTypeList),
                allowNull    : false,
                defaultValue : 'Other'
            },
            MeasurementUnit : {
                type      : Sequelize.STRING(128),
                allowNull : true
            },
            OwnerUserId : {
                type      : Sequelize.UUID,
                allowNull : true
            },
            Tags : {
                type         : Sequelize.TEXT,
                allowNull    : false,
                defaultValue : []
            },
            Version : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'V1'
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = BiometricsModel.Schema();

        return sequelize.define(
            BiometricsModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : BiometricsModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

    };

}
