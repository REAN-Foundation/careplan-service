import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../common/logger';

///////////////////////////////////////////////////////////////////////////////////

export class DatabaseModelManager {

    static setupAssociations = () => {

        var models = {};

        var modelsPath = path.join(__dirname, 'models');

        //Get all model file paths
        var modelFiles = fs.readdirSync(modelsPath).filter((file) => {
            return (file.indexOf(".js") !== -1);
        });

        //Import each of the model file into db object as key:val (model-name:model) pair
        modelFiles.forEach((file) => {
            const modelFilePath = path.join(modelsPath, file);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const mdl = require(modelFilePath);
            const modelName = mdl.ModelName;
            const model = mdl.Model;
            models[modelName] = model;
        });

        Object.keys(models).forEach(function (modelName) {
            //If the model has function 'associate', ...
            if (models[modelName].associate) {
                //This will set model associations
                models[modelName].associate(models);
            }
        });

        return models;
    }

    static dropAll = async () => {

        var models = {};

        var modelsPath = path.join(__dirname, 'models');

        //Get all model file paths
        var modelFiles = fs.readdirSync(modelsPath).filter((file) => {
            return (file.indexOf(".js") !== -1);
        });

        //Import each of the model file into db object as key:val (model-name:model) pair
        modelFiles.forEach((file) => {
            const modelFilePath = path.join(modelsPath, file);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const mdl = require(modelFilePath);
            const modelName = mdl.ModelName;
            const model = mdl.Model;
            models[modelName] = model;
        });

        for await (var modelName of Object.keys(models)) {
            try {
                await models[modelName].destroy({
                    where    : {},
                    truncate : true
                });
            }
            catch (error) {
                Logger.instance().log(error.message);
            }
        }

        return models;
    }

}
