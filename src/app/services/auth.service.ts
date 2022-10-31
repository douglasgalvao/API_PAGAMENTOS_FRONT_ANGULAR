import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @LocalStorage(environment.session.token) token!: string
  @LocalStorage(environment.session.user) user!: string

  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  login(data: { login: string, password: string }): Observable<string> {
    return this.httpClient.post(environment.apiurl.concat("/login"),
      data, { 'responseType': 'text' });
  }

  saveToken(jwt: string) {
    this.storageService.set(environment.session.token, jwt);
  }

  saveUser(user: any) {
    this.storageService.set(environment.session.user, user);
  }

  getToken() {
    return this.storageService.get(environment.session.token)
  }
  getUser() {
    return this.storageService.get(environment.session.user)
  }

  logOut() {
    console.log("eu entrei aqui");
    this.storageService.remove(environment.session.token);
    this.storageService.remove(environment.session.user);
    this.router.navigate(["/login"]);
  }


}
