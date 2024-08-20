import { Component, OnInit } from '@angular/core';
import {
  EXPENSES_CATEGORY_LIST,
  EXPENSES_ERROR_MESSAGES,
  EXPENSES_FORM_CONTROL_NAMES,
  EXPENSES_INPUT_DETAILS,
  EXPENSES_PAYMENT_METHOD,
} from './expenses.component.constants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IExpenses,
  IExpensesNoRemarks,
  IExpensesRequest,
  IExpensesViewDisplay,
} from './expenses.component.interface';
import { CurrencyPipe } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.less'],
  providers: [CurrencyPipe],
})
export class ExpensesComponent implements OnInit {
  allowViewEdit: boolean = true;
  defaultEditCategoryValue: string = '';
  defaultEditPaymentMethodValue: string = '';
  inputDetails = EXPENSES_INPUT_DETAILS;
  errorMessage = EXPENSES_ERROR_MESSAGES;
  formControlNames = EXPENSES_FORM_CONTROL_NAMES;
  expensesCategoriesList: object[] = EXPENSES_CATEGORY_LIST;
  expensesPaymentMethods: object[] = EXPENSES_PAYMENT_METHOD;
  expensesList: IExpenses[] = [];
  isDeleteExpenses: boolean = false;
  isEditExpenses: boolean = false;
  isSaveExpenses: boolean = false;
  isViewExpenses: boolean = false;
  expensesTableScrollHeight = '43.5vh';
  expensesTableRows = 15;
  viewExpensesDetails: IExpensesViewDisplay = {
    name: '',
    category: '',
    amount: '',
    id: '',
    date: new Date(),
    remarks: '',
    paymentMethod: '',
  };

  viewExpensesDetailsHeader: string = '';

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    let expensesListAPI: IExpenses[] = [
      {
        id: 1,
        name: 'Lunch at restaurant',
        category: 'Food',
        paymentMethod: 'Cash',
        remarks: 'Paid in cash',
        date: new Date('2024-08-01'),
        amount: 20.5,
      },
      {
        id: 2,
        name: 'Bus ticket',
        category: 'Transportation',
        paymentMethod: 'GCash',
        remarks: 'Round trip',
        date: new Date('2024-08-02'),
        amount: 3.0,
      },
      {
        id: 3,
        name: 'Grocery shopping',
        category: 'Grocery',
        paymentMethod: 'Bank Transfer',
        remarks: 'Weekly groceries',
        date: new Date('2024-08-03'),
        amount: 45.0,
      },
      {
        id: 4,
        name: 'Electric bill',
        category: 'Bills',
        paymentMethod: 'Maya',
        remarks: 'Monthly electricity bill',
        date: new Date('2024-08-04'),
        amount: 75.0,
      },
      {
        id: 5,
        name: 'Coffee',
        category: 'Drinks',
        paymentMethod: 'ShopeePay',
        remarks: 'Morning coffee',
        date: new Date('2024-08-05'),
        amount: 5.0,
      },
      {
        id: 6,
        name: 'Car fuel',
        category: 'Gas',
        paymentMethod: 'SpayLater',
        remarks: 'Full tank',
        date: new Date('2024-08-06'),
        amount: 50.0,
      },
      {
        id: 7,
        name: 'Doctor visit',
        category: 'Health',
        paymentMethod: 'CIMB',
        remarks: 'Routine checkup',
        date: new Date('2024-08-07'),
        amount: 100.0,
      },
      {
        id: 8,
        name: 'Clothes',
        category: 'Shopping',
        paymentMethod: 'Coins.ph',
        remarks: 'New outfit',
        date: new Date('2024-08-08'),
        amount: 120.0,
      },
      {
        id: 9,
        name: 'Flight ticket',
        category: 'Flight',
        paymentMethod: 'Cash',
        remarks: 'Round trip',
        date: new Date('2024-08-09'),
        amount: 200.0,
      },
      {
        id: 10,
        name: 'Game purchase',
        category: 'Gaming',
        paymentMethod: 'Bank Transfer',
        remarks: 'New video game',
        date: new Date('2024-08-10'),
        amount: 60.0,
      },
      {
        id: 11,
        name: 'Laptop repair',
        category: 'Electronics',
        paymentMethod: 'GCash',
        remarks: 'Screen replacement',
        date: new Date('2024-08-11'),
        amount: 150.0,
      },
      {
        id: 12,
        name: 'Movie ticket',
        category: 'Entertainment',
        paymentMethod: 'Maya',
        remarks: 'Movie night',
        date: new Date('2024-08-12'),
        amount: 120000.0,
      },
      {
        id: 13,
        name: 'Dinner with friends',
        category: 'Food',
        paymentMethod: 'ShopeePay',
        remarks: 'Group dinner',
        date: new Date('2024-08-13'),
        amount: 80.0,
      },
      {
        id: 14,
        name: 'Taxi ride',
        category: 'Transportation',
        paymentMethod: 'SpayLater',
        remarks: 'To the airport',
        date: new Date('2024-08-14'),
        amount: 15.0,
      },
    ];

    this.expensesList = expensesListAPI;
  }

  expensesForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    expensesDate: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
  });

  editExpensesForm = new FormGroup({
    editName: new FormControl('', [Validators.required]),
    editCategory: new FormControl('', [Validators.required]),
    editExpensesDate: new FormControl('', [Validators.required]),
    editAmount: new FormControl('', [Validators.required]),
    editPaymentMethod: new FormControl('', [Validators.required]),
    editRemarks: new FormControl(''),
  });

  saveExpenses() {
    let saveExpensesRequest: IExpensesRequest[] = [
      {
        name: '',
        category: '',
        amount: 0,
        date: new Date(),
        paymentMethod: '',
        remarks: '',
      },
    ];
    if (this.expensesForm.valid) {
      this.isSaveExpenses = true;
      console.log(this.expensesForm);

      saveExpensesRequest = [
        {
          name: this.getExpensesFormValue('name'),
          category: this.getExpensesFormValue('category').value,
          date: this.getExpensesFormValue('expensesDate'),
          amount: parseFloat(this.getExpensesFormValue('amount')),
          paymentMethod: this.getExpensesFormValue('paymentMethod').value,
          remarks: this.getExpensesFormValue('remarks'),
        },
      ];
    } else {
      this.expensesForm.markAllAsTouched();
    }
  }

  setEditFormValue(formControlName: string, value: any) {
    this.editExpensesForm.get(formControlName)?.setValue(value);
  }

  getExpensesFormValue(formControlName: string) {
    return this.expensesForm.get(formControlName)?.value;
  }

  getExpensesErrorMessage(
    formControlName: keyof typeof EXPENSES_ERROR_MESSAGES
  ): string {
    if (!(formControlName in this.formControlNames)) {
      return 'Error';
    }

    const control = this.expensesForm.get(formControlName);

    if (control?.hasError('required')) {
      return this.errorMessage[formControlName];
    }

    return this.errorMessage.default;
  }

  editExpensesRow(tableItem: IExpenses) {
    console.log(tableItem);
    const forrmattedAmount = this.currencyPipe.transform(
      tableItem.amount,
      'PHP',
      'symbol'
    );

    this.setEditFormValue('editName', tableItem.name);
    this.setEditFormValue('editCategory', tableItem.category);
    this.setEditFormValue('editExpensesDate', tableItem.date);
    this.setEditFormValue('editPaymentMethod', tableItem.paymentMethod);
    this.setEditFormValue('editAmount', forrmattedAmount);
    this.setEditFormValue('editRemarks', tableItem.remarks);

    Object.keys(this.editExpensesForm.controls).forEach((controlName) => {
      const control = this.editExpensesForm.get(controlName);
      if (control) {
        console.log(control.value);
      }
    });

    this.isEditExpenses = true;
  }

  confirmEdit() {
    alert('edited');
    this.isEditExpenses = false;
  }

  cancelEdit() {
    this.isEditExpenses = false;
  }

  deleteExpensesRow(tableItem: IExpenses) {
    this.isDeleteExpenses = true;
  }

  confirmDeletion() {
    alert('deleted');
    this.isDeleteExpenses = false;
  }

  cancelDeletion() {
    this.isDeleteExpenses = false;
  }

  viewExpensesRow(tableItem: IExpenses) {
    const forrmattedAmount = this.currencyPipe.transform(
      tableItem.amount,
      'PHP',
      'symbol'
    );

    this.viewExpensesDetailsHeader = `Viewing Expense ID : ${tableItem.id}`;
    this.viewExpensesDetails.category = tableItem.category;
    this.viewExpensesDetails.name = tableItem.name;
    this.viewExpensesDetails.date = tableItem.date;
    this.viewExpensesDetails.amount =
      forrmattedAmount || tableItem.amount.toString();
    this.viewExpensesDetails.paymentMethod = tableItem.paymentMethod;
    this.viewExpensesDetails.remarks = tableItem.remarks;
    this.isViewExpenses = true;
  }

  navigateToExpensesByDate() {
    this.router.navigate(['/expenses/view-expenses-by-date']);
  }

  determineCategoryIcon(category: string): string {
    switch (category) {
      case 'Food':
        return 'restaurant_menu';
      case 'Transportation':
        return 'commute';
      case 'Grocery':
        return 'local_grocery_store';
      case 'Bills':
        return 'credit_card';
      case 'Drinks':
        return 'local_cafe';
      case 'Gas':
        return 'local_gas_station';
      case 'Medical':
      case 'Health':
        return 'local_hospital';
      case 'Shopping':
        return 'local_offer';
      case 'Flight':
        return 'flight_takeoff';
      case 'Gaming':
        return 'videogame_asset';
      case 'Electronics':
        return 'phone_iphone';
      case 'Entertainment':
        return 'theaters';
      default:
        return 'help_outline';
    }
  }
}
