import {
    ArticleDto
} from '../../../domain.types/assets/article.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ArticleMapper {

    static toDto = (article: any): ArticleDto => {
        if (article == null) {
            return null;
        }
        const dto: ArticleDto = {
            id             : article.id,
            AssetCode      : article.AssetCode,
            Name           : article.Name,
            Summary        : article.Summary,
            Url            : article.Url,
            FileResourceId : article.FileResourceId,
            AssetCategory  : article.AssetCategory,
            OwnerUserId    : article.OwnerUserId,
            Tags           : article.Tags,
            Version        : article.Version,

        };
        return dto;
    };

}
