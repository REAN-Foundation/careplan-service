import { IntensityLevelList } from '../../../domain.types/assets/exercise.domain.types';
import { ExerciseTypeList } from '../../../domain.types/assets/exercise.domain.types';
import { DatabaseConnector } from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class ExerciseModel {

    static TableName = 'asset_exercises';

    static ModelName = 'Exercise';

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
            ExerciseType : {
                type         : Sequelize.ENUM(ExerciseTypeList),
                allowNull    : false,
                defaultValue : 'Aerobic'
            },
            IntensityLevel : {
                type         : Sequelize.ENUM(IntensityLevelList),
                allowNull    : false,
                defaultValue : 'Moderate'
            },
            RecommendedDurationMin : {
                type         : Sequelize.INTEGER,
                allowNull    : false,
                defaultValue : 15
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'Exercise'
            },
            OwnerUserId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
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
        const schema = ExerciseModel.Schema();

        return sequelize.define(
            ExerciseModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : ExerciseModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.Exercise.belongsTo(models.User, {
            sourceKey : 'OwnerUserId',
            targetKey : 'id',
            as        : 'OwnerUser'
        });

    };

}
