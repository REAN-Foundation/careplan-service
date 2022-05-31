import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class EnrollmentScheduleModel {

    static TableName = 'enrollment_schedules';

    static ModelName = 'EnrollmentSchedule';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type         : Sequelize.UUID,
                allowNull    : false,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            EnrollmentId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            UserId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            CareplanScheduleId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            AssetId : {
                type      : Sequelize.INTEGER,
                allowNull : false
            },
            AssetType : {
                type      : Sequelize.ENUM(["Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power"]),
                allowNull : false
            },
            CareplanId : {
                type       : Sequelize.INTEGER,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            TimeSlot : {
                type         : Sequelize.ENUM(["Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day"]),
                allowNull    : false,
                defaultValue : 'Unspecified'
            },
            ScheduledDate : {
                type      : Sequelize.DATE,
                allowNull : false
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = EnrollmentScheduleModel.Schema();

        return sequelize.define(
            EnrollmentScheduleModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : EnrollmentScheduleModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.EnrollmentSchedule.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });

        models.EnrollmentSchedule.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

        models.EnrollmentSchedule.belongsTo(models.CareplanSchedule, {
            sourceKey : 'CareplanScheduleId',
            targetKey : 'id',
            as        : 'CareplanSchedule'
        });

        models.EnrollmentSchedule.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
