import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SaveTask, TaskRepository, UpdateTask } from '../persistence/task-repository';
import { Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  public async save(dto: SaveTask) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
    return task;
  }

  public count() {
    return this.prisma.task.count();
  }

  public async delete(id: number) {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  public findAll() {
    return this.prisma.task.findMany();
  }

  public findById(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  public async update(
    id: number,
    dto: UpdateTask,
  ) {
    const task = await this.prisma.task.update({
      data: dto,
      where: { id },
    });
    return task;
  }

  public findAllByUser(userId: number) {
    return this.prisma.task.findMany({
      where: { userId }
    });
  }
}
