import { z } from 'zod'

export const EnvConfig = () => ({
	env: process.env.NODE_ENV || 'development',
	mongoUrl: process.env.MONGO_URL,
	mongoDbName: process.env.MONGO_DB_NAME,
	jwtSecret: process.env.JWT_SECRET,
})

export const EnvSchema = z.object({
	MONGO_URL: z
		.string({ message: 'MONGO_URL debe ser un string' })
		.trim()
		.min(1, 'MONGO_URL es requerido'),
	MONGO_DB_NAME: z
		.string({ message: 'MONGO_DB_NAME debe ser un string' })
		.trim()
		.min(1, 'MONGO_DB_NAME es requerido'),
	JWT_SECRET: z
		.string({ message: 'JWT_SECRET debe ser un string' })
		.trim()
		.min(1, 'JWT_SECRET es requerido'),
})

export const validateEnv = (env: Record<string, unknown>) => {
	const result = EnvSchema.safeParse(env)

	if (!result.success) {
		throw new Error(
			'Invalid environment variables: ' +
				result.error.issues.map((issue) => issue.message).join(', '),
		)
	}

	return result.data
}
