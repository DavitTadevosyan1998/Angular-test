import { Component, OnInit } from '@angular/core';
import {HomeService} from "./services/home/home.service";
import {StorageService} from "../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {User} from "../core/interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly id: string;
  public user: User;

  constructor(
    private homeService: HomeService,
    private storage: StorageService,
    private router: Router,
  ) {
    this.id = this.storage.retrieve('userId');
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.getUserById();
  }

  /**
   * get user data witch logged in
   */
  getUserById(): void {
    if (!this.id) {
      this.router.navigate(['/login'])
      return
    }
    this.homeService.getUserById(this.id)
      .subscribe((user: User) => {
        this.user = user;
      })
  }

  /**
   * clear storage and logout in this user
   */
  logout(): void {
    this.storage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
