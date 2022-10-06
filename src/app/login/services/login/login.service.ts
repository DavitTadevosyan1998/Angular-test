import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {User} from "../../../core/interfaces";
import {BaseApiService} from "../../../core/services/base-api/base-api.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseApiService: BaseApiService) { }

  signIn(params: HttpParams): Observable<User> {
    return this.baseApiService.get('/users', params)
      .pipe(
        map((res) => {
          if (!res.length) {
            throw new Error('The username or password you entered is not associated with any account.')
          }
          return res[0]
        })
      );
  }
}
