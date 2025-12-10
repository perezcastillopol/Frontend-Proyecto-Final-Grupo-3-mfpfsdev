import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpOptions } from '../../interfaces/httpOptions.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HttpServices {
  protected http = inject(HttpClient);
  protected auth: AuthService = inject(AuthService);
  protected baseUrl = 'http://localhost:3000/api';

  /**
   * Construye las opciones de la petición (headers, params).
   * Añade automáticamente el token si existe.
   */
  private buildOptions(options?: HttpOptions): {
    headers?: HttpHeaders;
    params?: HttpParams;
    observe: 'body';
  } {
    let headers = new HttpHeaders();

    const token = this.auth.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (options?.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers = headers.set(key, value);
      }
    }

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
