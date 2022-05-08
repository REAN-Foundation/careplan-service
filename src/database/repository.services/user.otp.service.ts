import { Model as UserOtp } from '../models/UserOtp';
import { ErrorHandler } from '../../common/error.handler';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserOtpService {

    create = async (userId, purpose) => {
        try {
            const otp = {
                UserId    : userId,
                Otp       : (Math.floor(Math.random() * 900000) + 100000).toString(),
                Purpose   : purpose,
                ValidFrom : new Date(),
                ValidTill : new Date(Date.now() + 600 * 1000),
            };
            return await UserOtp.create(otp);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create otp!', error);
        }
    };

    getLatestActiveOtp = async (userId) => {
        try {
            const otps = await UserOtp.findAll({
                where : {
                    UserId    : userId,
                    Validated : false,
                    ValidTill : { [Op.gte]: new Date() },
                },
                order : [['ValidTill', 'DESC']],
            });
            if (otps.length > 0) {
                return otps[0];
            }
            return null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve latest otp!', error);
        }
    };

    markAsUsed = async (id) => {
        try {
            var otp = await UserOtp.findByPk(id);
            otp.Validated = true;
            await otp.save();
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to mark otp as used!', error);
        }
    };
    
}
