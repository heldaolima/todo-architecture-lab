export class TaskCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly userId: number,
    public readonly createdAt: Date,
  ) {}
}
