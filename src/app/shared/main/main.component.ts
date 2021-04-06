import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  events;
  constructor(private router: Router, private service: UserService, private toastr:ToastrService) { }

  ngOnInit() {
     this.service.getEvents().subscribe(
        res => {
           this.events = res['events'];
        },
        err => {
           console.log(err.message)
           this.toastr.error('Internal Error when fetching data from server.', 'Internal Server Error');
        }
     );
  }

  onClickAttend(evtID: number) {
      const user = this.service.getCurrentUser();
      if(user) {
         this.service.attendEvent(evtID)
         .subscribe(
            res => {
               this.toastr.success('You are successuflly registered to attend the event.', 'Attendance Registration');
            },
            err => {
               console.log(err.message);
               if(err.code = 400) 
                this.toastr.error("You have already registered to this event", 'Error');
            }
         );
      } else {
         this.router.navigateByUrl('/login');
      }
  }
}
