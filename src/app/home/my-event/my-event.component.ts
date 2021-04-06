import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styles: [
  ]
})
export class MyEventComponent implements OnInit {
  events;
  constructor(private service: UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onClickCancelAttending(evtID: number) {
    this.service.cancelAttend(evtID).subscribe(
      res => {
        console.log(res);
        this.toastr.success('Atendance cancelled successfully.', 'Attendance Cancellation');
        this.fetchData();
      },
      err => {
        console.log(err.message);
        this.toastr.error('Internal Error when post attending request.', 'Internal Server Error');
      }
    )
  }

  fetchData() {
    this.service.getUserAttendedEvents().subscribe(
      res => {
        this.events = res['events'].map(evt => {
          const dateobj = new Date(evt['schedule']);
          const schedule = this.service.timeFormat(dateobj);
          evt.date = schedule.date;
          evt['time'] = schedule.time;
          return evt;
        });
      },
      err => {
        console.log(err.message)
        
      });
  }

}
