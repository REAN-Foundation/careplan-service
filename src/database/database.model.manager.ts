import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../common/logger';

///////////////////////////////////////////////////////////////////////////////////

export class DatabaseModelManager {

    static setupAssociations = async () => {

        var models = {};
        var modelClasses = {};

        var modelsPath = path.join(__dirname, 'models');

        //Get all model file paths
        var modelFiles = fs.readdirSync(modelsPath).filter((file) => {
            return (file.endsWith(".js"));
        });

        for await (var file of modelFiles) {

            var name: string = DatabaseModelManager.getModelName(file);
            
            const modelFilePath = path.join(modelsPath, file);
            const imported = await import(modelFilePath);
            const modelClass = imported[name];
            const modelName = modelClass.ModelName;
            const model = modelClass.Model();
            models[modelName] = model;
            modelClasses[modelName] = modelClass;
        }

        Object.keys(models).forEach(function (modelName) {
            const mdlClass = modelClasses[modelName];
            mdlClass.associate(models);
        });

        return models;
    }

    static getModelName = (file: string) => {

        var str = '';
        var f = file;
        f = f.replace('.js', '');

        for (var i = 0; i < f.length; i++) {
            var c = f.charAt(i);
            if (i === 0) {
                str += c.toUpperCase();
                continue;
            }
            if (c === '.') {
                i++;
                c = f.charAt(i);
                str += c.toUpperCase();
            }
            else {
                str += c;
            }
        }
        return str;
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
