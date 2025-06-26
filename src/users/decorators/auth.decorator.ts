import { AuthGuard } from '@nestjs/passport'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
/*  */
import { Roles } from 'src/users/interfaces/user.interface'
import { UserRoleGuard } from '../guards/user-role.guard'

export function Auth(admittedRoles?: Roles[]) {
	return applyDecorators(SetMetadata('roles', admittedRoles), UseGuards(AuthGuard(), UserRoleGuard))
}
