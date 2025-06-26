import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
/*  */
import { requireField, stringField } from 'src/common/constants/server-messages.constants'

export class LoginAuthDto {
	@IsString({ message: stringField('email') })
	@IsNotEmpty({ message: requireField('email') })
	@IsEmail()
	email: string

	@IsString({ message: stringField('password') })
	@IsNotEmpty({ message: requireField('password') })
	password: string
}
