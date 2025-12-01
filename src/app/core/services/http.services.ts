import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../interfaces/httpOptions.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {

  protected http = inject(HttpClient);
  protected baseUrl = 'http://localhost:3000/api';

  private buildOptions(options?: HttpOptions) {
    let httpOptions: any = {};

    if (options?.params) {
      let params = new HttpParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value as any);
        }
      });
      httpOptions.params = params;
    }

    if (options?.headers) {
      let headers = new HttpHeaders();
      Object.entries(options.headers).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
      httpOptions.headers = headers;
    }

    return httpOptions;
  }

  protected get(endpoint: string, options?: HttpOptions): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, this.buildOptions(options));
  }

  protected post(endpoint: string, body: any, options?: HttpOptions): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, body, this.buildOptions(options));
  }

  protected put(endpoint: string, body: any, options?: HttpOptions): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, body, this.buildOptions(options));
  }

  protected delete(endpoint: string, options?: HttpOptions): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`, this.buildOptions(options));
  }
}
