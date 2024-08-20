import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'web-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.less'],
})
export class DeleteModalComponent {
  @Input() isModalVisible: boolean = false;
  @Output() onConfirmDelete = new EventEmitter<any>();
  @Output() onHideModal = new EventEmitter<any>();
  @Output() onCancelDelete = new EventEmitter<any>();

  onDeleteConfirmation() {
    this.onConfirmDelete.emit();
  }

  onDeleteCancellation() {
    this.onCancelDelete.emit();
  }

  onModalHide() {
    this.onHideModal.emit();
  }
}
