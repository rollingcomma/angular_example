import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(public service: UserService, public router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form:NgForm) {
    console.log(form)
    let formData = new FormData();
    formData.set("Email", form.value.Email);
    formData.set("Password", form.value.Password);
    this.service.login(formData).subscribe(
      (res:any) => {
        const user = {
          email: res.email, 
          role: res.role,
          userName: res.userName
        };
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.service.user = user
        this.router.navigateByUrl('/home');
      },
      err => {
        if(err.status == 400) {
          this.toastr.error('The information you entered does not match our record!.', 'Login failed');
        }
      }
    )
  }

}
