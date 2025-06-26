import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async findAll() {
		const users = await this.userModel.find()

		return users
	}
}
