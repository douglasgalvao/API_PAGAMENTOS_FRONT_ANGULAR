import { UserBankRequestModel } from "./user-bank-request.model";

export class UserBankResponseModel implements UserBankRequestModel {
  email!: string;
  login!: string;
  cpf!: string;
  phoneNumber!: string;
  password!: string;
  id: string;
  accountId: string;
  constructor(
    id: string, accountId: string
  ) {
    this.id = id;
    this.accountId = accountId;
    // this.email = email;
    // this.username = username;
    // this.cpf = cpf;
    // this.phoneNumber = phoneNumber;
    // this.password = password;
  }


}
