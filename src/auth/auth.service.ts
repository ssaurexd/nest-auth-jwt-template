import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
/*  */
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { SERVER_ERRORS } from 'src/common/constants/server-messages.constants'
import { User } from 'src/users/entities/user.entity'
import { bcrypt } from 'src/common/adapters/bcrypt.adapter'
import { JwtPayload } from '../users/interfaces/jwt.interface'
import { LoginAuthDto } from './dto/login.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
	) {}

	private readonly logger = new Logger(AuthService.name)

	private genJWT(payload: JwtPayload): string {
		const token = this.jwtService.sign(payload)

		return token
	}

	async register(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto

		const user = await this.userModel.findOne({ email })

		if (user) {
			this.logger.warn(`User with email ${email} already exists`)
			throw new BadRequestException('User already exists')
		}

		try {
			const hashedPassword = await bcrypt.hash(password)
			const newUser = await this.userModel.create({
				email,
				password: hashedPassword,
			})
			const data = newUser.toJSON()
			const token = this.genJWT({ uid: data._id.toString() })

			return {
				...data,
				token,
			}
		} catch (error) {
			this.logger.error('Error creating user', error)
			throw new InternalServerErrorException(SERVER_ERRORS)
		}
	}

	async login(loginAuthDto: LoginAuthDto) {
		const { email, password } = loginAuthDto

		const user = await this.userModel.findOne({ email })

		if (!user) throw new BadRequestException('email or password is incorrect')

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			this.logger.log(`Invalid password for user with email ${email}`)
			throw new BadRequestException('email or password is incorrect')
		}

		try {
			const data = user.toJSON()
			const token = this.genJWT({ uid: data._id.toString() })

			return {
				...data,
				token,
			}
		} catch (error) {
			this.logger.error('Error logging in user', error)
			throw new InternalServerErrorException(SERVER_ERRORS)
		}
	}

	async refresh(authorization: string) {
		const token = authorization.replace('Bearer ', '')

		if (!token) {
			this.logger.log('No token provided for refresh')
			throw new BadRequestException('Token is required')
		}

		const { uid } = this.jwtService.decode<JwtPayload>(token)
		const user = await this.userModel.findById(uid)

		if (!user) {
			this.logger.log(`User with id ${uid} not found`)
			throw new BadRequestException('User not found')
		}

		try {
			const data = user.toJSON()
			const newToken = this.genJWT({ uid: data._id.toString() })

			return {
				...data,
				token: newToken,
			}
		} catch (error) {
			this.logger.error('Error refreshing token', error)
			throw new InternalServerErrorException(SERVER_ERRORS)
		}
	}
}
