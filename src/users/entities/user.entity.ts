import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Roles } from '../interfaces/user.interface'

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, unique: true, trim: true, lowercase: true, index: true, type: String })
	email: string

	@Prop({ required: true, type: String })
	password: string

	@Prop({
		type: [String],
		enum: ['user', 'admin'],
		default: ['user'],
		required: true,
	})
	roles: Roles[]

	@Prop({ default: true, type: Boolean })
	isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
	transform: (_doc, ret) => {
		delete ret.password
		delete ret.isActive
		delete ret.__v
		return ret
	},
})

UserSchema.set('toObject', {
	transform: (_doc, ret) => {
		delete ret.password
		delete ret.isActive
		delete ret.__v
		return ret
	},
})

UserSchema.pre('updateOne', function (next) {
	this.set({
		updatedAt: new Date(),
	})
	next()
})
