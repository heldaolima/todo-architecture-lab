export class TaskCompleted {
  constructor(
    public readonly taskId: number,
    public readonly title: string,
    public readonly userId: number,
    public readonly completedAt: Date,
  ) {}
}
