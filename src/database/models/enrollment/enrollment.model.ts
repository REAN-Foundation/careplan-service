import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class EnrollmentModel {

    static TableName = 'enrollments';

    static ModelName = 'Enrollment';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            CareplanId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            UserId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            StartDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            EndDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            EnrollmentDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ProgressStatus: {
                type: Sequelize.ENUM(["Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown"]),
                allowNull: false,
                defaultValue: 'Pending'
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = EnrollmentModel.Schema();

        return sequelize.define(
            EnrollmentModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: EnrollmentModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.Enrollment.belongsTo(models.Careplan, {
            sourceKey: 'CareplanId',
            targetKey: 'id',
            as: 'Careplan'
        });

        models.Enrollment.belongsTo(models.User, {
            sourceKey: 'UserId',
            targetKey: 'id',
            as: 'User'
        });

    };

}