import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
/*  */
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User, UserSchema } from './entities/user.entity'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: '1d',
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [MongooseModule, UsersService, JwtStrategy, PassportModule, JwtModule],
})
export class UsersModule {}
