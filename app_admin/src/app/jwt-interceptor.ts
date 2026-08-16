import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { BROWSER_STORAGE } from './storage';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const storage = inject(BROWSER_STORAGE);
  const token = storage.getItem('travlr-token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};
