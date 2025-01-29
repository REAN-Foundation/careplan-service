import express from "express";
import fs from "fs";
import fileUpload from "express-fileupload";
import multer from 'multer';
import { ConfigurationManager } from "./../config/configuration.manager";

/////////////////////////////////////////////////////////////////////////

export const expressFileUploadMiddleware = (router: express.Router) => {
    const MAX_UPLOAD_FILE_SIZE = ConfigurationManager.MaxUploadFileSize();

    router.use(fileUpload({
        limits            : { fileSize: MAX_UPLOAD_FILE_SIZE },
        preserveExtension : true,
        createParentPath  : true,
        parseNested       : true,
        useTempFiles      : true,
        tempFileDir       : '/tmp/uploads/'
    }));
};

export const multerFileUploadMiddleware = (router: express.Router) => {
    const MAX_UPLOAD_FILE_SIZE = ConfigurationManager.MaxUploadFileSize();
    const UPLOAD_FOLDER = ConfigurationManager.UploadTemporaryFolder();

    if (!fs.existsSync(UPLOAD_FOLDER)) {
        fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, UPLOAD_FOLDER);
        },
        filename : (request, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    });
    const upload = multer({
        storage : storage,
        limits  : { fileSize: MAX_UPLOAD_FILE_SIZE },
    }).single('file');

    router.use((req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).send({ message: err.message });
            } else if (err) {
                return res.status(400).send({ message: err.message });
            }
            next();
        });
    });
};
