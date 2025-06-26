import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
/*  */
import { JwtPayload } from '../interfaces/jwt.interface'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		configService: ConfigService,
	) {
		super({
			secretOrKey: configService.get<string>('JWT_SECRET')!,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { uid } = payload
		const user = await this.userModel.findById(uid)

		if (!user) throw new UnauthorizedException()
		if (!user.isActive) throw new UnauthorizedException('User is not active')

		return user
	}
}
