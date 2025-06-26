import { Controller, Post, Body, HttpCode, HttpStatus, Headers } from '@nestjs/common'
/*  */
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { LoginAuthDto } from './dto/login.dto'
import { Auth } from '../users/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	create(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	login(@Body() loginAuthDto: LoginAuthDto) {
		return this.authService.login(loginAuthDto)
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@Auth()
	refresh(@Headers('authorization') authorization: string) {
		return this.authService.refresh(authorization)
	}
}
