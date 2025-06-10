import { Task } from "src/core/domain/entities/task.entity";

export interface PasswordEncryptionPlugin {
    encrypt:(task: Task, password: string) => Task;
    decrypt: (task: Task, password: string) => Task;
}