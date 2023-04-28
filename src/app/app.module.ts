import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//componentes
import { AppComponent } from './app.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

//modulos
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    PagesModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true },//inyectamos el interceptor 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService //permitir decodificar y decodificar token 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
