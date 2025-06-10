import { Task } from "src/core/domain/entities/task.entity";

export interface TaskNotificationPlugin {
    onTaskCreated: (task: Task) => void;
    onTaskCompleted: (task: Task) => void;
}