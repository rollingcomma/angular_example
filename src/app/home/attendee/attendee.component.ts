import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styles: [
  ]
})
export class AttendeeComponent implements OnInit {
  
  event
  attendees
  constructor(private router: Router, private service: UserService) {
    this.event = this.router.getCurrentNavigation().extras.state.event;
   }

  ngOnInit(): void {
    
    var formatedDate = this.service.timeFormat(new Date(this.event.schedule));
    this.event['date'] = formatedDate.date;
    this.event['time'] = formatedDate.time;
    console.log(this.event)
    this.service.getEventAttendees(this.event.evtID)
    
    .subscribe(
      res => {
        this.attendees = res['users']
        
      },
      err => {
          console.log(err.message)
      }
    );
  }

}
