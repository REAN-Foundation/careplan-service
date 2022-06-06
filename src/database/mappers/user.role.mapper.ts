import {
    UserRoleDto
} from '../../domain.types/user/user.role.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserRoleMapper {

    static toDto = (userRole: any): UserRoleDto => {
        if (userRole == null) {
            return null;
        }
        const dto: UserRoleDto = {
            id: userRole.id,
            UserId: userRole.UserId,
            RoleId: userRole.RoleId,

        };
        return dto;
    };

}