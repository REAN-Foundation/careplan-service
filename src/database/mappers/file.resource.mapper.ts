import {
    FileResourceDto
} from '../../domain.types/file.resource.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class FileResourceMapper {

    static toDto = (fileResource: any): FileResourceDto => {
        if (fileResource == null) {
            return null;
        }
        const dto: FileResourceDto = {
            id: fileResource.id,
            FileName: fileResource.FileName,
            UserId: fileResource.UserId,
            IsPublicResource: fileResource.IsPublicResource,
            Tags: fileResource.Tags,
            MimeType: fileResource.MimeType,

        };
        return dto;
    };

}