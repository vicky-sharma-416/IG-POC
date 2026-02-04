import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bank',
    pathMatch: 'full'
  },
  {
    path: 'bank',
    loadComponent: () =>
      import('../bank/bank.component')
        .then(m => m.BankComponent)
  }
];