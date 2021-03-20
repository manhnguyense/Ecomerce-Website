import { Complain } from '../../models/complain';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { ComplainService } from '../../service/complain.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-complain-modal',
  templateUrl: './complain-modal.component.html',
  styleUrls: ['./complain-modal.component.css'],
})
export class ComplainModalComponent
  extends BaseModalComponent<Complain>
  implements OnInit {
  @Input() complain: Complain;
  @Input() modalTitle: string;
  @Input() isVisible = false;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Complain>();
  id: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly complainService: ComplainService,
    private readonly chileMessageService: NzMessageService
  ) {
    super(complainService);
  }

  ngOnInit(): void {
    this.modalTitle = 'Reply complain';
    this.buildForm();
  }

  submitForm() {
    this.complainService.id.subscribe((data) => (this.id = data));
    this.complainService
      .replyComplain(this.id, this.baseForm.get('message').value)
      .subscribe((res) => {
        if (res.code == 'OK') {
         this.cancelModal()
        }
      });
  }

  cancelModal() {
    super.cancel(this.cancelModalEvent);
  }
  buildForm() {
    this.baseForm = this.formBuilder.group({
      message: [null, [Validators.required]],
    });
  }
}