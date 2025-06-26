import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
/*  */
import { User } from 'src/users/entities/user.entity'
import { Roles } from 'src/users/interfaces/user.interface'

@Injectable()
export class UserRoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<Express.Request>()

		const user = request.user as User | undefined
		const admintedRoles = this.reflector.get<Roles[] | undefined>('roles', context.getHandler())

		if (!user) throw new UnauthorizedException()
		if (!admintedRoles || admintedRoles.length === 0) return true

		const userRoles = user.roles || []
		const hasRole = userRoles.some((role) => admintedRoles.includes(role))

		if (hasRole) return true

		throw new ForbiddenException('You do not have permission to access this resource')
	}
}
