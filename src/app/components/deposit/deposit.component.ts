import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  public form!: FormGroup;
  public loader: boolean = false;
  public depositSucess: string = "";
  public accountIdPlaceHolder: string = "";
  public actualBalance: number = 0.0;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private authService: AuthService,

  ) {

  }

  ngOnInit(): void {
    this.initform();
  }


  deposit(): boolean {
    this.accountService.deposit(this.form.value);
    return true;
  }


  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.deposit();
      this.depositSucess = "The money has been deposited into account"
    }
  }

  initform() {
    this.form = this.formBuilder.group({
      balance: [0, [Validators.required]],
      id: [null, [Validators.required]]
    })
    this.initIdAndBalance();
  }

  // myRegex(text: string): string {
  //   const aux = "";
  //   for(let i=0;i<text.length;i++){

  //   }
  // }
  initIdAndBalance(): void {
    this.userService.getProfileInformations(this.authService.getToken()).subscribe((retorno) => {
      this.loader = true;
      this.accountIdPlaceHolder = this.accountService.toJson(retorno.sub).UserBank.accountID;
      this.accountService.findByID(this.accountService.toJson(retorno.sub).UserBank.accountID).subscribe((retorno) => {
        this.actualBalance = retorno.balance;
      })
    })
  }

}
