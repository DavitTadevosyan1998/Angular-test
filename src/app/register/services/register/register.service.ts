import { Injectable } from '@angular/core';
import {BaseApiService} from "../../../core/services/base-api/base-api.service";
import {Observable} from "rxjs";
import {User} from "../../../core/interfaces";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private baseApiService: BaseApiService) { }

  createUser(data: User): Observable<User> {
    return this.baseApiService.post('/users', data);
  }

  getUsers(params: HttpParams): Observable<User[]> {
    return this.baseApiService.get('/users', params);
  }
}
