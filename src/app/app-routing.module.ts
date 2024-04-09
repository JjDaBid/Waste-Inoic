import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '@Angular/fire/auth-guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'waste',
    loadChildren: () => import('./pages/waste/waste/waste.module').then( m => m.WastePageModule)
  },
  {
    path: 'waste-form',
    loadChildren: () => import('./pages/waste/waste-form/waste-form.module').then( m => m.WasteFormPageModule)
  },

  {
    path: 'waste-form/:id',
    loadChildren: () => import('./pages/waste/waste-form/waste-form.module').then( m => m.WasteFormPageModule)
  },

  {
    path: 'waste-details/:id',
    loadChildren: () => import('./pages/waste/waste-details/waste-details.module').then( m => m.WasteDetailsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
