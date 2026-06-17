import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'employee/list',
    pathMatch: 'full'
  },

  {
    path: 'employee/create',
    loadComponent: () =>
      import('./pages/employee/employee-create/employee-create')
        .then(m => m.EmployeeCreate)
  },

  {
    path: 'employee/list',
    loadComponent: () =>
      import('./pages/employee/employee-list/employee-list')
        .then(m => m.EmployeeList)
  },

  {
    path: 'employee/edit/:id',
    loadComponent: () =>
      import('./pages/employee/employee-edit/employee-edit')
        .then(m => m.EmployeeEdit)
  },

  {
    path: 'employee/view/:id',
    loadComponent: () =>
      import('./pages/employee/employee-view/employee-view')
        .then(m => m.EmployeeView)
  },

  {
    path: 'employee/report/:id',
    loadComponent: () =>
      import('./pages/employee/employee-report/employee-report')
        .then(m => m.EmployeeReport)
  }

];