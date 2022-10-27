import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBankRequestModel } from 'src/app/models/user-bank-request.model';
import { UserBankResponseModel } from 'src/app/models/user-bank-response.model copy';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formInputs!: FormGroup;
  public created!: boolean;

  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {

    if (!this.formInputs.valid) {
      alert("Preencha todos os campos");

      return;
    }
    this.created = true;
    let form = this.formInputs.value;
    let userBank = new UserBankRequestModel(form.email, form.login, form.cpf, form.phoneNumber, form.password);
    this.userService.createUser(userBank).subscribe((retorno: UserBankResponseModel) => {
      this.created = false;
      this.router.navigateByUrl("/login");
    });

  }


  get f(){
    return this.formInputs.controls;
  }


  private initForm(): void {
    this.formInputs = this.form.group({
      email: ["",[Validators.email,Validators.required]],
      login: ["",[Validators.required]],
      cpf: ["",[Validators.required]],
      phoneNumber: ["",[Validators.required]],
      password: ["",[Validators.required]]
    })
  }

}
