import { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'

export const logsConfig: WinstonModuleOptions = {
	level: 'debug',
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(
				format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss a' }),
				format.errors({ stack: true }),
				format.colorize(),
				format.printf(
					(info: { timestamp: string; level: string; message: any; stack?: string }) => {
						let logMessage = `${info.timestamp} | ${info.level}: ${
							info.message && typeof info.message === 'object'
								? JSON.stringify(info.message, null, 2)
								: String(info.message)
						}`

						if (info.stack) {
							logMessage += `\n${info.stack}`
						}

						return logMessage
					},
				),
			),
		}),
		new transports.File({
			filename: 'logs/logs.log',
			level: 'debug',
			format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
			maxsize: 524288000, // 500 MB
			maxFiles: 1,
		}),
	],
}
