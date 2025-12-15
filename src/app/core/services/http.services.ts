import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpOptions } from '../../interfaces/httpOptions.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HttpServices {
  protected http = inject(HttpClient);
  protected baseUrl = 'http://localhost:3000/api';

  /**
   * Construye las opciones de la petición (headers, params).
   */
  private buildOptions(options?: HttpOptions): {
    headers?: HttpHeaders;
    params?: HttpParams;
    observe: 'body';
  } {
    let headers = new HttpHeaders();

    let params: HttpParams | undefined;
    if (options?.params) {
      params = new HttpParams();
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== null && value !== undefined) {
          params = params.set(key, value as any);
        }
      }
    }

    return { observe: 'body', headers, params };
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
