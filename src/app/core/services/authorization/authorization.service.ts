import { Injectable } from '@angular/core';
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private storage: StorageService) { }

  get isAuthorized(): boolean {
    return this.storage.retrieve('userId') !== undefined;
  }

}
