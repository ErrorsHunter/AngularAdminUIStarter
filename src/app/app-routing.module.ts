import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardcomponentsComponent } from './components/dashboardcomponents/dashboardcomponents.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: SidebarComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboardcomponents', component: DashboardcomponentsComponent },
      // Add more routes for other components
    ]
  },
  { path: '**', component: PagenotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
