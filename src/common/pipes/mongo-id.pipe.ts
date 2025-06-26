import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
	transform(value: any, _metadata: ArgumentMetadata): any {
		if (!isValidObjectId(value)) {
			throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`)
		}

		return value
	}
}
