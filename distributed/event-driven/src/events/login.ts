export class LoginEvent {
  constructor(
    public readonly userEmail: string,
    public readonly loginAt: Date,
  ) {}
}
