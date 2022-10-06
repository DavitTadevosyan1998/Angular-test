import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import WhiteSpaceValidator from "../core/helpers/white-space-validator/white-space-validator";
import {MustMatch} from "../core/helpers/mast-match.validators/mast-match.validators";
import {Register} from "./interfaces";
import {v4 as uuid} from 'uuid';
import {RegisterService} from "./services/register/register.service";
import {StorageService} from "../core/services/storage/storage.service";
import {User} from "../core/interfaces";
import {Router} from "@angular/router";
import {map, mergeMap, Observable, throwError, timer} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public successMsg!: boolean;
  public errMsg!: string;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private storage: StorageService,
    private router: Router,
  ) {
    this.registerForm = new FormGroup<{ [propName: string]: AbstractControl }>({});
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  get f(): { [propName: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /**
   * create form group for register form
   * @private
   * @returns FormGroup
   */
  private createRegisterForm(): FormGroup {
    return this.fb.group({
      id: [uuid()],
      username: ['', [Validators.required, WhiteSpaceValidator]],
      password: ['', [Validators.required, Validators.minLength(8), WhiteSpaceValidator]],
      confirm_password: ['', [Validators.required, WhiteSpaceValidator]]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  getUsers(data: User): Observable<User[]> {
    const params: HttpParams = new HttpParams()
      .set('username', data.username)
      .set('password', data.password);
    return this.registerService.getUsers(params);
  }

  /**
   * create account
   */
  onSubmit(): void {
    const data = this.registerForm.value as Register;
    this.successMsg = false;
    this.errMsg = '';

    delete data.confirm_password;

    this.getUsers(data)
      .pipe(
        mergeMap(res => {
          if (res.length) {
            throw new Error('User already exists');
          }
          return this.registerService.createUser(data);
        })
      )
      .subscribe((res: User) => {
        this.storage.store('userId', res.id);
        this.successMsg = true;
        timer(2000)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }, error => {
        this.errMsg = error.message;
      });
  }

}
