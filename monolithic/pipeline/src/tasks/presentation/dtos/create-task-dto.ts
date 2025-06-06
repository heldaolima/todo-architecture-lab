export class CreateTaskDTO {
  constructor(
    public title: string,
    public description?: string,
  ) { }
}
