import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styles: [
  ]
})
export class AdminEventComponent implements OnInit {

  events;
  errMsg = ''; 
  msg ='';
  isPosted = false;
  constructor(
    private router: Router, 
    private service: UserService, 
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchData();
  }

  openFormModal() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.result.then(result => {
      if(result == 'Submit') {
         this.fetchData();
      }
    })

  }

  async onClickGetAttendees(event: any) {
    await this.router.navigateByUrl("/home/attendee", {state:{event:event}}) ;  
  }

  onClickDeleteEvent(evtID: number) {
    this.service.deleteEvent(evtID)
    .subscribe(
      res => {
        this.toastr.success('Event deleted.', 'Event Management');
        this.fetchData();
      },
      err => {

      }
    )
  }

  fetchData() {
    this.service.getEvents().subscribe(
      res => {
          this.events = res['events'];
      },
      err => {
          console.log(err.message)
      }
    );
  }

}
