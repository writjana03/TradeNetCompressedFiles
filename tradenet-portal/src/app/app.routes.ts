import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
  { path: 'login', loadChildren: () => import('./features/auth/components/login/login.routes').then(m => m.LOGIN_ROUTES) },
  { path: 'register', loadChildren: () => import('./features/auth/components/register/register.routes').then(m => m.REGISTER_ROUTES) },
  {
    path: 'portal',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./features/business-trader/components/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'licenses', loadChildren: () => import('./features/business-trader/components/license-list/license-list.routes').then(m => m.LICENSE_LIST_ROUTES) },
      { path: 'profile', loadChildren: () => import('./features/business-trader/components/profile/profile.routes').then(m => m.PROFILE_ROUTES) },
    ]
  },
  { path: '**', redirectTo: '/home' }
];
