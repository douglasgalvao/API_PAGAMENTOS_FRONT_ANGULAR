import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { JWTModel } from 'src/app/models/jwt-model';
import { UserInformations } from 'src/app/models/user-informations.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public jwt_token: string = "";

  public userInformations: UserInformations = new UserInformations("", "", "", "", "", "", "");
  public loader: boolean = true;
  public loaderAcc: boolean = true;
  public balanceAccount: number = 0.0;
  constructor(
    private storage: LocalStorageService,
    private userService: UserService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.initUserInformations();
  }

  initUserInformations(): void {
    this.jwt_token = this.storage.get("token");
    if (this.jwt_token.length) {
      this.userService.getProfileInformations(this.jwt_token).subscribe((retorno: JWTModel) => {
        const userInformationsJson: any = this.accountService.toJson(retorno.sub);
        this.loader = false;
        this.mapper(userInformationsJson);
        this.accountService.findByID(this.userInformations.accountID).subscribe((retorno) => {
          this.loaderAcc = false;
          this.balanceAccount = retorno.balance;
          console.log(this.balanceAccount);
        })
      });


    }
  }

  mapper(userInformationsJson: any) {
    this.userInformations.accountID = userInformationsJson.UserBank.accountID;
    this.userInformations.cpf = userInformationsJson.UserBank.cpf;
    this.userInformations.email = userInformationsJson.UserBank.email;
    this.userInformations.id = userInformationsJson.UserBank.id;
    this.userInformations.phoneNumber = userInformationsJson.UserBank.phoneNumber;
    this.userInformations.login = userInformationsJson.UserBank.login;
  }


}
