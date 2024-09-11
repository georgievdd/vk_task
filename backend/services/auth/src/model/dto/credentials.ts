export class Credentials {
  password: string;
  username: string;
  email: string;
  constructor(password: string, username: string, email: string) {
    this.password = password;
    this.username = username;
    this.email = email;
  }
}
