import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient
  ) { }


  async deposit(userInfo: any): Promise<void> {

    const source = this.httpClient.post<any>(environment.apiurl + "/account/deposit", {
      "id": userInfo.id,
      "balance": userInfo.balance
    });
    const data = await firstValueFrom(source);
  }

  toJson(text: string): any {
    const obj: any = {};
    const filteredText = text.replace(/(\(|\))/g, ' ').replace(/,/g, '');
    const fields = filteredText.split(' ');
    const parent = fields[0];
    obj[parent] = {};

    fields.map((item: any, index: any) => {
      if (index) {
        const s = item.split('=');
        const key = s[0];
        const value = s[1];

        obj[parent][key] = value;
      }
    });

    return obj;
  }

  findByID(id: any): Observable<any> {
    return this.httpClient.get(environment.apiurl + "/account/" + id);
  }

}
