import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'resume',
        pathMatch: 'full'
      },
      {
        path: 'resume',
        loadChildren: () => import('../resume/resume.module').then(m => m.ResumePageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('../transactions/transactions.module').then(m => m.TransactionsPageModule)
      },
      {
        path: 'offers',
        loadChildren: () => import('../offers/offers.module').then(m => m.OffersPageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('../requests/requests.module').then( m => m.RequestsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
