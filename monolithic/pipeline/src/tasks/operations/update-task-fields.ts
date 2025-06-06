import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../presentation/dtos/create-task-dto';
import { Operation } from './operation';

@Injectable()
export class UpdateTaskFields
  implements Operation<CreateTaskDTO, CreateTaskDTO> {
  public execute(input: CreateTaskDTO): Promise<CreateTaskDTO> {
    if (!input.title) {
      return Promise.reject(
        new BadRequestException('Task title should be inform'),
      );
    }
    input.title = input.title.trim();

    if (input.title === '') {
      return Promise.reject(
        new BadRequestException('Task title should not be empty'),
      );
    }
    if (input.title.length < 3 || input.title.length > 50) {
      return Promise.reject(
        new BadRequestException('Task title should have betwen 3 and 50 chars'),
      );
    }

    return Promise.resolve(input);
  }
}
