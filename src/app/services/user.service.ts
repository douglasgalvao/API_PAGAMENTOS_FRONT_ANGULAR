import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserBankRequestModel } from '../models/user-bank-request.model';
import { UserBankResponseModel } from '../models/user-bank-response.model copy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProfileInformations(text: string): Observable<any> {
    // https://paymentapiapp.herokuapp.com/payment-api/users/profile
    return this.httpClient.get<any>(environment.apiurl + '/users/profile');
  }

  createUser(userInput: UserBankRequestModel): Observable<UserBankResponseModel> {
    return this.httpClient.post<UserBankResponseModel>(environment.apiurl + "/users", userInput, { 'responseType': 'json' });
  }


}
