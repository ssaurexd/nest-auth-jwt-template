import { NestFactory } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import { ValidationPipe } from '@nestjs/common'
/*  */
import { AppModule } from './app.module'
import { logsConfig } from './common/config/logs.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger(logsConfig),
	})

	app.setGlobalPrefix('api')
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
