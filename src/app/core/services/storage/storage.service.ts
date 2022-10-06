import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public retrieve(key: string): any {
    const item = this.storage.getItem(key);
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return;
  }

  public store(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
