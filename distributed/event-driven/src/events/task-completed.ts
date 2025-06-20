export class TaskCompleted {
  constructor(
    public taskId: number,
    public title: string,
    public userId: number,
    public completedAt: Date,
  ) {}
}
