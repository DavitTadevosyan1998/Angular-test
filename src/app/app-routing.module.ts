import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsNotLoggedInGuard} from "./core/guards/is-not-logged-in/is-not-logged-in.guard";
import {IsLoggedInGuard} from "./core/guards/is-logged-in/is-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [IsNotLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
