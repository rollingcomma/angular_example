import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RegistrationComponent } from './index/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './index/login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './shared/main/main.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminEventComponent } from './home/admin-event/admin-event.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MyEventComponent } from './home/my-event/my-event.component';
import { EventComponent } from './shared/event/event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './home/modal-form/modal-form.component';
import { AttendeeComponent } from './home/attendee/attendee.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    AdminEventComponent,
    ForbiddenComponent,
    MyEventComponent,
    EventComponent,
    ModalFormComponent,
    AttendeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule, 
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
