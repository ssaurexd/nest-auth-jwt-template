import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import {
	passwordField,
	requireField,
	stringField,
} from 'src/common/constants/server-messages.constants'

export class CreateUserDto {
	@IsString({ message: stringField('email') })
	@IsNotEmpty({ message: requireField('email') })
	@IsEmail()
	email: string

	@IsString({ message: stringField('password') })
	@IsNotEmpty({ message: requireField('password') })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		message: passwordField('password'),
	})
	password: string
}
