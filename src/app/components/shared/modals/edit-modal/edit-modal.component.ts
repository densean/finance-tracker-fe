import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'web-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.less'],
})
export class EditModalComponent {
  @Input() isModalVisible: boolean = false;
  @Input() modalTitle: string = '';
  @Output() onConfirmEdit = new EventEmitter<any>();
  @Output() onCancelEdit = new EventEmitter<any>();
  @Output() onHideModal = new EventEmitter<any>();

  onEditConfirmation() {
    this.onConfirmEdit.emit();
  }

  onEditCancellation() {
    this.onCancelEdit.emit();
  }

  onModalHide() {
    this.onHideModal.emit();
  }
}
