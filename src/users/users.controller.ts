import { Controller, Get } from '@nestjs/common'
/*  */
import { UsersService } from './users.service'
import { Auth } from 'src/users/decorators/auth.decorator'
import { ADMIN } from 'src/common/constants/roles.constants'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Auth([ADMIN])
	findAll() {
		return this.usersService.findAll()
	}
}
