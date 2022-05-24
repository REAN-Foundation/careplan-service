import { ConsultationTypeList } from '../../../domain.types/assets/consultation.domain.types';
import { DatabaseConnector } from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class ConsultationModel {

    static TableName = 'asset_consultations';

    static ModelName = 'Consultation';

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
            ConsultationType : {
                type         : Sequelize.ENUM(ConsultationTypeList),
                allowNull    : false,
                defaultValue : 'Tele-consultation'
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'Consultation'
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
        const schema = ConsultationModel.Schema();

        return sequelize.define(
            ConsultationModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : ConsultationModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.Consultation.belongsTo(models.User, {
            sourceKey : 'OwnerUserId',
            targetKey : 'id',
            as        : 'OwnerUser'
        });

    };

}
