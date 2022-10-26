export class JWTModel {
  sub!: string;
  name!: string;
  admin!: string;

  constructor(
    sub: string, name: string, admin: string
  ) {
    this.sub = sub;
    this.name = name;
    this.admin = admin;
    // this.password = password;
  }

}
