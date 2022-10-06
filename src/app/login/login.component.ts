import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import WhiteSpaceValidator from "../core/helpers/white-space-validator/white-space-validator";
import {Register} from "../register/interfaces";
import {User} from "../core/interfaces";
import {StorageService} from "../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {LoginService} from "./services/login/login.service";
import {HttpParams} from "@angular/common/http";
import {timer} from "rxjs";
import {Login} from "./interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMsg!: boolean;
  public errMsg!: string;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup<{ [propName: string]: AbstractControl }>({});
  }

  ngOnInit(): void {
    this.loginForm = this.createRegisterForm();
  }

  get f(): {[propName: string]: AbstractControl} {
    return this.loginForm.controls;
  }


  /**
   * create form group for register form
   * @private
   * @returns FormGroup
   */
  private createRegisterForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, WhiteSpaceValidator]],
      password: ['', [Validators.required, WhiteSpaceValidator]]
    });
  }

  /**
   * create account
   */
  onSubmit(): void {
    const data = this.loginForm.value as Login;

    const params: HttpParams = new HttpParams()
      .set('username', data.username)
      .set('password', data.password)
    this.loginService.signIn(params)
      .subscribe((res: User) => {
        this.storage.store('userId', res.id);
        this.successMsg = true;
        timer(2000)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }, (error) => {
        this.errMsg = error.message;
      });
  }

}
