import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';

const skipAuthRules = [
  // Auth
  { url: '/api/auth/login', methods: ['POST'] },
  { url: '/api/auth/register', methods: ['POST'] },

  // GET trips
  { url: '/api/trips', methods: ['GET'] },
  { url: /^\/api\/trips\/user\/\d+$/, methods: ['GET'] },
  { url: /^\/api\/trips\/modality\/\d+$/, methods: ['GET'] },
  { url: '/api/trips/filter', methods: ['GET'] },
  { url: /^\/api\/trips\/\d+$/, methods: ['GET'] },

  // MODALITY públicos (GET)
  { url: '/api/modality', methods: ['GET'] },
  { url: /^\/api\/modality\/\d+$/, methods: ['GET'] },

  // REVIEWS públicos (GET)
  { url: /^\/api\/reviews\/trip\/\d+$/, methods: ['GET'] },
];

function isPublicRequest(reqUrl: string, reqMethod: string): boolean {
  return skipAuthRules.some(rule => {
    const matchesUrl =
      typeof rule.url === 'string'
        ? reqUrl.startsWith(rule.url)
        : rule.url.test(reqUrl);

    const matchesMethod = rule.methods.includes(reqMethod.toUpperCase());

    return matchesUrl && matchesMethod;
  });
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth = inject(AuthService);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = req.url.split('?')[0];
    const method = req.method;

    if (isPublicRequest(url, method)) {
      return next.handle(req); // NO token
    }

    const token = this.auth.getToken()
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }

}
