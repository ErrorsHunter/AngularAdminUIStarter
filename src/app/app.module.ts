import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import {HotToastModule} from '@ngneat/hot-toast'
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardcomponentsComponent } from './components/dashboardcomponents/dashboardcomponents.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    PagenotfoundComponent,
    DashboardComponent,
    DashboardcomponentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot({position:"top-right"}),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
