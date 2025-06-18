import {
    AssessmentDto
} from '../../../domain.types/assets/assessment.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class AssessmentMapper {

    static toDto = (assessment: any): AssessmentDto => {
        if (assessment == null) {
            return null;
        }
        const dto: AssessmentDto = {
            id                    : assessment.id,
            AssetCode             : assessment.AssetCode,
            Name                  : assessment.Name,
            Description           : assessment.Description,
            AssetCategory         : assessment.AssetCategory,
            Template              : assessment.Template,
            ReferenceTemplateCode : assessment.ReferenceTemplateCode,
            ReferenceTemplateId   : assessment.ReferenceTemplateId,
            OwnerUserId           : assessment.OwnerUserId,
            TenantId              : assessment.TenantId,
            Tags                  : assessment.Tags,
            Version               : assessment.Version,

        };
        return dto;
    };

}
