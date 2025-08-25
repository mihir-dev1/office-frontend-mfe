import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { RoleComponent } from './components/role/role.component';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    canActivate: [noAuthGuard],
    component:LoginComponent
  },
  {
    path:'register',
    canActivate: [noAuthGuard],
    component:RegisterComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        canActivate: [authGuard],
        component: DashboardComponent
      },
      {
        path: 'role',
        canActivate: [authGuard],
        component:RoleComponent
      },
      {
        path: 'company',
        canActivate: [authGuard],
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4202/remoteEntry.js',
            exposedModule: './CompanyModule'
          }).then(m => m.CompanyModule)
      },
      {
        path: 'employee',
        canActivate: [authGuard],
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js', // 👈 employee port
            exposedModule: './EmployeeModule'
          }).then(m => m.EmployeeModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
