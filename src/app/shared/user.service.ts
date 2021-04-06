import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseRouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

   readonly BaseURI = '/api';
   user = null;
   
   constructor(private fb:FormBuilder, private http:HttpClient) { }
   
   ngOnInit() {
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('uerRole');
      if(email && role) {
         this.user ={
            email: email,
            role : role
         }
      }
   }

   userFormModel = this.fb.group({
      UserName: ['', Validators.required],
      Email:['', [Validators.email, Validators.required]],
      FirstName:['', Validators.required],
      LastName:['', Validators.required],
      Passwords:this.fb.group({
         Password:['', [Validators.required, Validators.minLength(4)]],
         ConfirmPassword:['', Validators.required] }, 
         { Validators : this.comparePasswords })
   });

   eventFormModel = this.fb.group({
      EventName:['', Validators.required],
      EventDate:['', Validators.required],
      EventTime:['', [Validators.required, Validators.pattern(/^(0*[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])*$/)]],
      EventDesc:['', Validators.required]
   })

   comparePasswords(fb:FormGroup){
      let confirmPwdCtrl = fb.get('ConfirmPassword');
      if(confirmPwdCtrl.errors == null || 'passwordMismatch' in confirmPwdCtrl.errors) {
         if(fb.get('Password').value != confirmPwdCtrl.value)
         confirmPwdCtrl.setErrors({passwordMismatch: true});
         else
         confirmPwdCtrl.setErrors(null);
      }
   }

   timeFormat(dateobj : Date) {
      const date =  dateobj.getDate() + "-" + dateobj.toLocaleString('default', {month:"short"});
      let hours = dateobj.getHours() - dateobj.getTimezoneOffset()/60;
      let mins =  dateobj.getMinutes();
      const ampm = hours > 12? 'PM' : "AM";
      hours = hours % 12;
      hours = hours? hours: 12;
      const time = hours + ":" + (mins < 10? '0'+mins:mins) + ampm;
      return {date: date, time: time};
   }

   getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
   }

   register() {
      let body = {
         UserName: this.userFormModel.value.UserName,
         Email: this.userFormModel.value.Email,
         FirstName: this.userFormModel.value.FirstName,
         LastName: this.userFormModel.value.LastName,
         Password: this.userFormModel.value.Passwords.Password,
      };
      return this.http.post(this.BaseURI+'/AppUser/register', body);
   }

   login(formData) {
      return this.http.post(this.BaseURI+'/AppUser/login', formData);
   }

   getEvents() {
      return this.http.get(this.BaseURI+'/AppEvent');
   }

   PostEvent() {
      const time = this.eventFormModel.value.EventTime.split(':');
      
      time[1] = time[1]? time[1]:0;
      let schedule = new Date( this.eventFormModel.value.EventDate.year,
         this.eventFormModel.value.EventDate.month -1,
         this.eventFormModel.value.EventDate.day, 
         time[0],
         time[1]
      );
      const formData = new FormData();
     
         let body = {
            Name: this.eventFormModel.value.EventName,
            Schedule: schedule,
            Description: this.eventFormModel.value.EventDesc
         }
         return this.http.post(this.BaseURI+'/AppEvent/add-event', body);
   
   }

   attendEvent( evtID: number) {
      return this.http.get(`${this.BaseURI}/UserEvent/attend-event/${evtID}`)
   }

   cancelAttend( evtID: number) {
      return this.http.get(`${this.BaseURI}/UserEvent/cancel-attend/${evtID}`)
   }

   getEventAttendees(evtID: number) {
      return this.http.get(`${this.BaseURI}/UserEvent/event-attendees/${evtID}`)
   }

   getUserAttendedEvents() {
      return this.http.get(this.BaseURI+'/UserEvent/user-events')
   }

   deleteEvent(evtID: number) {
      return this.http.delete(`${this.BaseURI}/AppEvent/${evtID}`)
   }

   roleMatch(allowedRoles): boolean {
      var isMatch = false;
      var user= JSON.parse(localStorage.getItem('user'));
      console.log(user)
      allowedRoles.forEach(item => {
         if(user.role == item) {
            isMatch = true;
         }
      })
      return isMatch;
   }
   
}
