import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent : () => import('./components/home/home')
    },
    {
        path: 'hero-register',
        loadComponent: () => import('./components/hero-register/hero-register')
    },
    {
        path: 'table',
        loadComponent: () => import('./components/table/table')
    },
    {
        path: 'hero-update/:id',
        loadComponent: () => import('./components/hero-update/hero-update')
    },
    
];
