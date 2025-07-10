import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
   console.log('Intercepted Request:', req.url);
   const loadingService = inject(LoadingService);
   loadingService.show();
   setTimeout(() => {
    loadingService.hide() 
   },1500);
   
  return next(req);
};
