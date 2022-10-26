import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public actualTab: string = "deposit";
  public authService: AuthService
  constructor(
    private storage: LocalStorageService,
    authService: AuthService
  ) {
    this.authService = authService
  }


  ngOnInit(): void {
  }


}
