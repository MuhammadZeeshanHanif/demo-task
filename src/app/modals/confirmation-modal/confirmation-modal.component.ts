import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() title: string = ""
  @Input() message: string = ""
  @Input() okText: string = "Save"
  @Input() cancelText: string = "Cancel"
  @Input() isOkButtonPrimary: boolean = true;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {}

  get modal(): NgbActiveModal {
    return this.activeModal;
  }

}
