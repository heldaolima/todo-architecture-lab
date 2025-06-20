export class LoginEvent {
  constructor(
    public userEmail: string,
    public loginAt: Date,
  ) {}
}
