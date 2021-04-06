import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {
  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }
  onSubmit() {
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.userFormModel.reset();
          this.toastr.success('Congrats! New user created.', 'Registration successful');
        
        } else {
          res.errors.forEach(item => {
            switch(item.code) {
              case 'DuplicateUserName':
                  this.toastr.error('UserName is already taken.', 'Registration failed');
          
                  break;
              default:
                this.toastr.error(item.description, 'Registration failed')
                break;
            }
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
