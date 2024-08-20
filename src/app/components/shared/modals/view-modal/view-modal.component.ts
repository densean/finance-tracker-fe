import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'web-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.less'],
})
export class ViewModalComponent {
  @Input() viewModalHeader: string = '';
  @Input() isModalVisible: boolean = false;
  @Output() onHide = new EventEmitter<any>();

  onModalHide() {
    this.onHide.emit();
  }
}
