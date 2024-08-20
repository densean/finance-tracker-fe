import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'web-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.less'],
})
export class SaveModalComponent {
  // @Input() modalTitle: string = '';
  @Input() isModalVisible: boolean = false;
  @Input() modalMessage: string = '';
  @Output() onHideModal = new EventEmitter<any>();

  onModalHide() {
    this.onHideModal.emit();
  }
}
