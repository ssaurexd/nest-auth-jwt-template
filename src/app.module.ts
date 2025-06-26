import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

/*  */
import { CommonModule } from './common/common.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { EnvConfig, validateEnv } from './common/config/env.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfig],
			validate: validateEnv,
		}),
		MongooseModule.forRoot(process.env.MONGO_URL || '', { dbName: process.env.MONGO_DB_NAME }),
		CommonModule,
		AuthModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
