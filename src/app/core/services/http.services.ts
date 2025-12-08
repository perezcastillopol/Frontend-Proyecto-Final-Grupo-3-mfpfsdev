import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {HttpOptions} from '../../interfaces/httpOptions.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  protected http = inject(HttpClient);
  protected baseUrl = 'http://localhost:3000/api';

  private buildOptions(options?: HttpOptions): {
    headers?: HttpHeaders;
    params?: HttpParams;
    observe: 'body';
  } {
    const httpOptions: {
      headers?: HttpHeaders;
      params?: HttpParams;
      observe: 'body';
    } = { observe: 'body' };

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

  protected get<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return lastValueFrom(
      this.http.get<T>(`${this.baseUrl}${endpoint}`, this.buildOptions(options))
    );
  }

  protected post<T>(endpoint: string, body: any, options?: HttpOptions): Promise<T> {
    return lastValueFrom(
      this.http.post<T>(`${this.baseUrl}${endpoint}`, body, this.buildOptions(options))
    );
  }

  protected put<T>(endpoint: string, body: any, options?: HttpOptions): Promise<T> {
    return lastValueFrom(
      this.http.put<T>(`${this.baseUrl}${endpoint}`, body, this.buildOptions(options))
    );
  }

  protected delete<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return lastValueFrom(
      this.http.delete<T>(`${this.baseUrl}${endpoint}`, this.buildOptions(options))
    );
  }
}
