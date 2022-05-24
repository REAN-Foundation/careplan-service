import {
    DatabaseConnector
} from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class MedicationModel {

    static TableName = 'asset_medications';

    static ModelName = 'Medication';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            AssetCode: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            Name: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            Description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            AssetCategory: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: 'Medication'
            },
            OwnerUserId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            Tags: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: []
            },
            Version: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: 'V1'
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = MedicationModel.Schema();

        return sequelize.define(
            MedicationModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: MedicationModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.Medication.belongsTo(models.User, {
            sourceKey: 'OwnerUserId',
            targetKey: 'id',
            as: 'OwnerUser'
        });

    };

}