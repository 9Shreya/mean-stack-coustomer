import {BaseService} from './base.service';
import {ServiceService} from './service.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {AuthGuard} from 'authGaurd/auth.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [ServiceService,BaseService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
