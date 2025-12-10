import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth = inject(AuthService);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const token = this.auth.getToken?.() ?? localStorage.getItem('token');

      // No añadir header para login/register o endpoints públicos concretos
      const skipAuthPaths = [
        '/api/auth/login',
        '/api/auth/register'
      ];
      const requestPath = req.url.split('?')[0];

      const isPublic = skipAuthPaths.some(p =>
        (p.startsWith('/') ? requestPath.endsWith(p) : requestPath.includes(p))
      );

      const authReq = token && !isPublic
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

      return next.handle(authReq).pipe(
        catchError((err: any) => {
          // Si es 401 y no es una petición de login/register, logout y redirect
          if (err && err.status === 401 && !requestPath.endsWith('/api/auth/login') && !requestPath.endsWith('/api/auth/register')) {
            try {
              this.auth.logout?.();
            } catch (e) {
              // fallback: limpiar localStorage
              localStorage.removeItem('token');
            }
            // redirigir al login
            if (this.router.url !== '/login') {
              this.router.navigate(['/login']);
            }
          }
          return throwError(() => err);
        })
      );
    } catch (err) {
      return next.handle(req);
    }
  }
}
