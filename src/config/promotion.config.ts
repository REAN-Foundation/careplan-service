////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface PromotionTargetConfig {
    ApiUrl: string;
    ReanCareApiUrl: string;
    UserName: string;
    Password: string;
    LoginRoleId: number;
    ApiKey: string;
}

export class PromotionConfig {

    static getTargetConfig(): PromotionTargetConfig | null {
        const apiUrl = process.env.PROMOTION_TARGET_API_URL;
        const reanCareApiUrl = process.env.PROMOTION_TARGET_REANCARE_API_URL;
        const userName = process.env.PROMOTION_TARGET_USERNAME;
        const password = process.env.PROMOTION_TARGET_PASSWORD;
        const loginRoleId = process.env.PROMOTION_TARGET_LOGIN_ROLE_ID;
        const apiKey = process.env.PROMOTION_TARGET_API_KEY;

        if (!apiUrl || !reanCareApiUrl || !userName || !password || !loginRoleId || !apiKey) {
            return null;
        }

        return {
            ApiUrl         : apiUrl.replace(/\/$/, ''),
            ReanCareApiUrl : reanCareApiUrl.replace(/\/$/, ''),
            UserName       : userName,
            Password       : password,
            LoginRoleId    : parseInt(loginRoleId, 10),
            ApiKey         : apiKey
        };
    }

    static isPromotionEnabled(): boolean {
        return this.getTargetConfig() !== null;
    }

}
