export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public completed: boolean,
    public userId: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}
