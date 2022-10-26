export class UserBankRequestModel {
  email: string;
  login: string;
  cpf: string;
  phoneNumber: string;
  password: string;
  constructor(
    email: string, login: string, cpf: string, phoneNumber: string, password: string
  ) {
    this.email = email;
    this.login = login;
    this.cpf = cpf;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }


}
