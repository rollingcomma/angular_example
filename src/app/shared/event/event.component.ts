import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [
  ]
})
export class EventComponent implements OnInit {

  @Input() event: object
  date
  time

  constructor(private service:UserService) { }

  ngOnInit(): void {
    const dateobj = new Date(this.event['schedule']);
    const schedule = this.service.timeFormat(dateobj);
    this.date = schedule.date;
    this.time = schedule.time;
  }

}
