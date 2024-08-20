import { Component, OnInit } from '@angular/core';
import {
  BILLS_INPUT_DETAILS,
  BILLS_FORM_CONTROL_NAMES,
  BILLS_OCCURRENCE_LIST,
  BILLS_TERM_SCHEDULE,
  BILLS_ERROR_MESSAGES,
} from './bills.component.constants';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {
  IBillDisplay,
  IBillRequest,
  IBills,
} from './bills.component.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.less'],
})
export class BillsComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  inputDetails = BILLS_INPUT_DETAILS;
  formControlNames = BILLS_FORM_CONTROL_NAMES;
  billsOccurrence: object[] = BILLS_OCCURRENCE_LIST;
  billsTermSchedule: object[] = BILLS_TERM_SCHEDULE;
  errorMessage = BILLS_ERROR_MESSAGES;
  formErrorMessage: any = '';
  selectedDate: Date | null = null;
  billsList: IBills[] = [];
  cardBillsList: IBills[] = [];
  viewBillDetails: IBillDisplay[] = [
    {
      id: '',
      name: '',
      dueDate: new Date(),
      amount: 0,
      notes: '',
      occurrence: 0,
      isPaid: false,
      term: 0,
    },
  ];
  isViewBill: boolean = false;
  billDates: string[] = [];
  isCalendarView: boolean = false;
  selectedDateHeader: string = '';

  billsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    occurrence: new FormControl('', [Validators.required]),
    term: new FormControl('', [
      Validators.required,
      this.termValidator.bind(this),
    ]),
    termSchedule: new FormControl('', [
      Validators.required,
      this.termValidator.bind(this),
    ]),
    notes: new FormControl(''),
  });

  ngOnInit(): void {
    this.billsForm
      .get('term')
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.billsForm
          .get('termSchedule')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.billsForm
      .get('termSchedule')
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.billsForm
          .get('term')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.setBillFormValue('termSchedule', 1);

    let billsListAPI: IBills[] = [
      {
        id: 1,
        name: 'Electricity Bill',
        amount: 75.5,
        dueDate: new Date('2024-08-15'),
        notes: 'Payment due by the 15th of each month.',
        term: 1,
        occurrence: 1,
        isPaid: false,
        isInstallment: false,
        paidCount: 0,
      },
      {
        id: 2,
        name: 'Internet Bill',
        amount: 50.0,
        dueDate: new Date('2024-08-15'),
        notes: 'Payment is automatically deducted from the bank account.',
        term: 1, // Monthly
        occurrence: 1,
        isPaid: true,
        isInstallment: false,
        paidCount: 0,
      },
      {
        id: 3,
        name: 'Rent',
        amount: 1200.0,
        dueDate: new Date('2024-08-05'),
        notes: 'Rent due on the 5th of every month.',
        term: 1, // Monthly
        occurrence: 1,
        isPaid: false,
        isInstallment: false,
        paidCount: 0,
      },
      {
        id: 4,
        name: 'Credit Card Payment',
        amount: 150.25,
        dueDate: new Date('2024-08-20'),
        notes: 'Minimum payment required to avoid late fees.',
        term: 1, // Monthly
        occurrence: 1,
        isPaid: false,
        isInstallment: false,
        paidCount: 0,
      },
      {
        id: 5,
        name: 'Gym Membership',
        amount: 40.0,
        dueDate: new Date('2024-08-10'),
        notes: 'Automatic renewal every month.',
        term: 1, // Monthly
        occurrence: 1,
        isPaid: true,
        isInstallment: false,
        paidCount: 0,
      },
    ];

    this.cardBillsList = billsListAPI
      .filter((bill) => !bill.isPaid)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 3);

    this.billsList = billsListAPI;

    this.billDates = billsListAPI.map((bill) =>
      moment(bill.dueDate).format('MMM Do YY')
    );
  }

  ngOnDestroy(): void {
    // Complete the Subject to trigger unsubscription
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  termValidator(control: AbstractControl): ValidationErrors | null {
    const termControl = control.parent?.get('term');
    const termScheduleControl = control.parent?.get('termSchedule');

    if (!termControl || !termScheduleControl) return null;

    const termValue = termControl.value;
    const termScheduleValue = termScheduleControl.value;

    if (termValue && !termScheduleValue) {
      return { termTooShort: true };
    }

    if (!termValue && termScheduleValue) {
      return { termTooShort: true };
    }

    return null;
  }

  getBillsErrorMessage(
    formControlName: keyof typeof BILLS_ERROR_MESSAGES
  ): string {
    if (!(formControlName in this.billsForm.controls)) {
      return '';
    }

    const control = this.billsForm.get(formControlName);

    if (!control?.touched) {
      return '';
    }

    if (formControlName === 'term' || formControlName === 'termSchedule') {
      if (control.hasError('termTooShort')) {
        return this.errorMessage.term;
      }
    }

    if (control.hasError('required')) {
      return this.errorMessage[formControlName] || this.errorMessage.default;
    }

    return this.errorMessage.default;
  }

  setBillFormValue(formControlName: string, value: any) {
    this.billsForm.get(formControlName)?.setValue(value);
  }

  getBillFormValue(formControlName: string) {
    return this.billsForm.get(formControlName)?.value;
  }

  saveBill() {
    let saveBillRequest: IBillRequest = {
      name: '',
      amount: 0,
      dueDate: new Date(),
      notes: '',
      occurrence: 1,
      term: 1,
    };
    if (this.billsForm.valid) {
      saveBillRequest = {
        name: this.getBillFormValue('name'),
        amount: this.getBillFormValue('amount'),
        dueDate: this.getBillFormValue('dueDate'),
        notes: this.getBillFormValue('notes'),
        //to be converted
        occurrence: this.getBillFormValue('occurrence'),
        term: this.getBillFormValue('term'),
      };
    } else {
      this.billsForm.markAllAsTouched();
    }
  }

  onViewBill(bill: IBillDisplay | IBills): void {
    this.viewBillDetails[0] = {
      name: bill.name,
      id: `Viewing bill ID : ${bill.id}`,
      term: bill.term,
      amount: bill.amount,
      dueDate: bill.dueDate,
      notes: bill.notes,
      occurrence: bill.occurrence,
      isPaid: bill.isPaid,
    };
    this.selectedDateHeader = moment
      .utc(this.viewBillDetails[0].dueDate)
      .local()
      .format('MMMM DD');

    this.isViewBill = true;
  }

  onViewBillHide() {
    this.viewBillDetails = [];
    this.isViewBill = !this.isViewBill;
  }

  onUpdatePaid(bill: IBills): void {
    alert('Updated to paid!');
  }

  onDateSelect(event: Date) {
    const billsDueOnDate = this.billsList.filter((bill) =>
      this.isSameDate(bill.dueDate, event)
    );

    this.selectedDateHeader = moment
      .utc(billsDueOnDate[0].dueDate)
      .local()
      .format('MMMM DD');

    if (billsDueOnDate.length > 0) {
      this.viewBillDetails = billsDueOnDate.map((bill) => ({
        name: bill.name,
        id: `Viewing bill ID : ${bill.id}`,
        term: bill.term,
        amount: bill.amount,
        dueDate: bill.dueDate,
        notes: bill.notes,
        occurrence: bill.occurrence,
        isPaid: bill.isPaid,
      }));

      this.isViewBill = true;
    } else {
      alert('No bills on this date.');
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      moment(date1).format('MMM Do YY') === moment(date2).format('MMM Do YY')
    );
  }

  checkDateForBills(date: any) {
    const calendarDate = new Date(date.year, date.month, date.day);
    const pCalendarDate = moment(calendarDate).format('MMM Do YY');

    return this.billDates.some((billDate) => {
      return billDate.toLocaleString() === pCalendarDate.toLocaleString();
    });
  }
}
