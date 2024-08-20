export const EXPENSES_INPUT_DETAILS = {
  description: {
    inputTitle: 'Name',
    formControlName: 'description',
    placeholder: 'Add a description',
  },
  category: {
    inputTitle: 'Category type',
    formControlName: 'category',
    placeholder: 'Select a category type',
  },
  expensesDate: {
    inputTitle: 'Date',
    formControlName: 'expensesDate',
    placeholder: 'Add expenses date',
  },
  amount: {
    inputTitle: 'Amount',
    formControlName: 'amount',
    placeholder: 'Add expenses amount',
  },
  paymentMethod: {
    inputTitle: 'Payment method',
    formContName: 'paymentMethod',
    placeholder: 'Select a payment method',
  },
  remarks: {
    inputTitle: 'Remarks',
    formControlName: 'remarks',
    placeholder: 'Enter remarks',
  },
};

export const EXPENSES_ERROR_MESSAGES = {
  description: 'Please add a name',
  category: 'Please choose a category',
  expensesDate: 'Please add a date',
  amount: 'Please add an amount',
  paymentMethod: 'Please choose a payment method',
  default: 'This field is required',
};

export const EXPENSES_FORM_CONTROL_NAMES = {
  description: 'description',
  category: 'category',
  expensesDate: 'expensesDate',
  amount: 'amount',
  remarks: 'remarks',
  paymentMethod: 'paymentMethod',
};

export const EXPENSES_CATEGORY_LIST = [
  { name: 'Food', value: 'Food' },
  { name: 'Transportation', value: 'Transportation' },
  { name: 'Grocery', value: 'Grocery' },
  { name: 'Bills', value: 'Bills' },
  { name: 'Drinks', value: 'Drinks' },
  { name: 'Gas', value: 'Gas' },
  { name: 'Health', value: 'Health' },
  { name: 'Shopping', value: 'Shopping' },
  { name: 'Flight', value: 'Flight' },
  { name: 'Gaming', value: 'Gaming' },
  { name: 'Electronics', value: 'Electronics' },
  { name: 'Entertainment', value: 'Entertainment' },
  { name: 'Bills', value: 'Bills' },
];

export const EXPENSES_PAYMENT_METHOD = [
  { name: 'Cash', value: 'Cash' },
  { name: 'Bank Transfer', value: 'BankTransfer' },
  { name: 'GCash', value: 'GCash' },
  { name: 'Maya', value: 'Maya' },
  { name: 'GoTyme', value: 'GoTyme' },
  { name: 'ShopeePay', value: 'ShopeePay' },
  { name: 'SpayLater', value: 'SpayLater' },
  { name: 'CIMB', value: 'CIMB' },
  { name: 'Coins.ph', value: 'Coins.ph' },
];
