import { BadRequestException, Injectable } from '@nestjs/common';
import { Operation } from './operation';
import { UpdateTaskDTO } from '../presentation/dtos/update-task-dto';

@Injectable()
export class ValidateUpdateTaskFields
  implements Operation<UpdateTaskDTO, UpdateTaskDTO> {
  public execute(input: UpdateTaskDTO): Promise<UpdateTaskDTO> {
    if (input.title) {
      input.title = input.title.trim();
      if (input.title === '') {
        return Promise.reject(
          new BadRequestException('Task title should not be empty'),
        );
      }
      if (input.title.length < 3 || input.title.length > 50) {
        return Promise.reject(
          new BadRequestException(
            'Task title should have betwen 3 and 50 chars',
          ),
        );
      }
    }

    if (input.description) {
      if (input.description.length < 3) {
        return Promise.reject(
          new BadRequestException(
            'Task description should have at least 3 chars',
          ),
        );
      }
    }

    return Promise.resolve(input);
  }
}
