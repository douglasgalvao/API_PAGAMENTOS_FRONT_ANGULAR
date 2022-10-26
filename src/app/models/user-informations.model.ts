export class UserInformations {
  accountID!: string;
  cpf!: string;
  email!: string;
  phoneNumber!: string;
  login!: string;
  id!: string;

  constructor(
    account: string, accountID: string, cpf: string, email: string, phoneNumber: string, login: string, id: string
  ) {
    this.accountID = accountID;
    this.cpf = cpf;
    this.email = email;
    this.id = id;
    this.login = login;
    this.phoneNumber = phoneNumber;
  }

}

