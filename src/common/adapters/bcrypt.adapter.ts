import { compare, hash, genSalt } from 'bcrypt'

export const bcrypt = {
	async hash(password: string): Promise<string> {
		const salt: string = await genSalt(10)
		const hashedPassword: string = await hash(password, salt)

		return hashedPassword
	},

	async compare(password: string, hashedPassword: string): Promise<boolean> {
		const isValid: boolean = await compare(password, hashedPassword)

		return isValid
	},
}
