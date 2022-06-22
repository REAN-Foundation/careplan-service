import { MeditationTypeList } from '../../../domain.types/assets/meditation.domain.types';
import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class MeditationModel {

    static TableName = 'asset_meditations';

    static ModelName = 'Meditation';

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
            MeditationType : {
                type         : Sequelize.ENUM(MeditationTypeList),
                allowNull    : false,
                defaultValue : 'Mindfulness'
            },
            RecommendedDurationMin : {
                type         : Sequelize.INTEGER,
                allowNull    : false,
                defaultValue : 15
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'Stress management'
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
        const schema = MeditationModel.Schema();

        return sequelize.define(
            MeditationModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : MeditationModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

    };

}
