import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login-page.component').then((m) => m.LoginPage),
    ...canActivate(() => redirectLoggedInTo(['/onboarding'])),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then((m) => m.SignUpPage),
    ...canActivate(() => redirectLoggedInTo(['/onboarding'])),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./pages/onboarding/onboarding-page.component').then(
        (m) => m.OnboardingPage
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/sign-up'])),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
