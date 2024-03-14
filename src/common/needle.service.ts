import needle from "needle";
import { Logger } from "./logger";
import { Helper } from "./helper";

export class NeedleService {

    public static async needleRequestForREAN (method: string, url:string, accessToken?, obj?) {
        const ReanBackendBaseUrl = process.env.REANCARE_BACKEND_BASE_URL;
        if (!accessToken) {
            accessToken = null;
        }
        const options = await NeedleService.getHeaders(accessToken);
        const apiUrl = ReanBackendBaseUrl + url;
        let response = null;
        if (method === "get") {
            response = await needle(method, apiUrl, options);
    
        } else {
            response = await needle(method, apiUrl, obj, options);
        }
    
        if (response.statusCode === 200 || response.statusCode === 201) {
            Logger.instance().log('Reancare Api is successfull');
        } else {
            Logger.instance().log("Failed to get response from Reancare API.");
        }
    
        return response.body;
    }

    private static getHeaders = (accessToken?: any) => {
        const reancare_api_key = process.env.REANCARE_API_KEY;
        if (!accessToken) {
            accessToken = null;
        }
        const headers = {
            "authorization" : `Bearer ${accessToken}`,
            "x-api-key"     : reancare_api_key
        };
        const options = Helper.getNeedleOptions(headers);
        return options;
    };

}
