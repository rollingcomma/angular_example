import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})

export class HomeComponent implements OnInit {

   user;
   constructor(private router: Router, private service: UserService) { }

   ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
   }


   onLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/');
   }
}
