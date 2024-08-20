import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IExpenses } from '../../pages/expenses/expenses.component.interface';

@Component({
  selector: 'web-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input() tableItems: any[] = [];
  @Input() allowViewEditActions: boolean = false;
  @Input() emptyTableMessage: string = '';
  @Input() emptyTableSubMessage: string = '';
  @Input() tableScrollHeight: string = '';
  @Input() tableRows: number = 2;
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  tableProperties: string[] = [];

  generateTableHeader<T>(sampleObject: any): void {
    Object.keys(sampleObject).forEach((key) => {
      this.tableProperties.push(key);
    });
  }

  ngOnInit(): void {
    if (this.tableItems.length > 0) {
      this.generateTableHeader(this.tableItems[0]);
    }
  }

  onClickView(tableItem: any) {
    this.onView.emit(tableItem);
  }

  onClickEdit(tableItem: any) {
    this.onEdit.emit(tableItem);
  }

  onClickDelete(tableItem: any) {
    this.onDelete.emit(tableItem);
  }
}
