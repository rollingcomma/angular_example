import { Component, OnInit } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {

  errMsg = '';
  constructor(public service : UserService, public activeModal: NgbActiveModal) { }

  onClick() {
    console.log("submit btn clicked")
  }

  onSubmitAddEvent() {
    this.service.PostEvent()
    .subscribe(
      res => {
        this.service.userFormModel.reset();
        this.activeModal.close("Submit");
      },
      err => {
        console.log(err);
        this.errMsg = err.message;
      }
    )
  }


}
