import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserActivityResponseModel {

    static TableName = 'user_activity_responses';

    static ModelName = 'UserActivityResponse';

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
            UserId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            EnrollmentScheduleId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            CareplanScheduleId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            CareplanId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            AssetId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            AssetType: {
                type: Sequelize.ENUM(["Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power"]),
                allowNull: false
            },
            Response: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: '{}'
            },
            TimeResponded: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ProgressStatus: {
                type: Sequelize.ENUM(["Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown"]),
                allowNull: false,
                defaultValue: 'Completed'
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = UserActivityResponseModel.Schema();

        return sequelize.define(
            UserActivityResponseModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: UserActivityResponseModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.UserActivityResponse.belongsTo(models.User, {
            sourceKey: 'UserId',
            targetKey: 'id',
            as: 'User'
        });

        models.UserActivityResponse.belongsTo(models.EnrollmentSchedule, {
            sourceKey: 'EnrollmentScheduleId',
            targetKey: 'id',
            as: 'EnrollmentSchedule'
        });

        models.UserActivityResponse.belongsTo(models.CareplanSchedule, {
            sourceKey: 'CareplanScheduleId',
            targetKey: 'id',
            as: 'CareplanSchedule'
        });

        models.UserActivityResponse.belongsTo(models.Careplan, {
            sourceKey: 'CareplanId',
            targetKey: 'id',
            as: 'Careplan'
        });

    };

}