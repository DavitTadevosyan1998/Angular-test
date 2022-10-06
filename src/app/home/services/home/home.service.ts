import { Injectable } from '@angular/core';
import {BaseApiService} from "../../../core/services/base-api/base-api.service";
import {Observable} from "rxjs";
import {User} from "../../../core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private baseApiService: BaseApiService) { }

  getUserById(id: string): Observable<User> {
    return this.baseApiService.get(`/users/${id}`);
  }

}
