import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;
  public returnUrl!: string;
  public logged!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  async onSubmit(): Promise<void> {
    this.logged=false;
    if (!this.formLogin.valid) {
      alert("Preencha todos os campos");
      return;
    }

    this.authService.login(this.formLogin.value).subscribe(
      (token: string) => {
        this.logged=true;
        this.authService.saveToken(token);
        this.router.navigateByUrl(this.returnUrl);
      }
    );
  }

  private initForm(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

}
