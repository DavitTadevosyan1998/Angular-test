import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private readonly BASE_URL: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.BASE_URL = env.apiUrl
  }


  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}${path}`, {params});
  }

  public post(path: string, body: object = {}, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}${path}`, body, {headers});
  }
}
