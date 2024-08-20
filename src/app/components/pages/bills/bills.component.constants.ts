export const BILLS_INPUT_DETAILS = {
  name: {
    inputTitle: 'Name',
    formControlName: 'name',
    placeholder: 'Add a description',
  },
  amount: {
    inputTitle: 'Amount',
    formControlName: 'amount',
    placeholder: 'Add bill amount',
  },
  dueDate: {
    inputTitle: 'Due date',
    formControlName: 'dueDate',
    placeholder: 'Select due date',
  },
  notes: {
    inputTitle: 'Notes',
    formControlName: 'notes',
    placeholder: 'Enter notes',
  },
  occurrence: {
    inputTitle: 'Occurrence',
    formControlName: 'occurrence',
    placeholder: 'Select bill occurrence',
  },
  term: {
    inputTitle: 'Term',
    formControlName: 'term',
    placeholder: 'Add bill term',
  },
  termSchedule: {
    // inputTitle: ''
    formControlName: 'termSchedule',
    placeholder: 'Unit',
  },
};

export const BILLS_FORM_CONTROL_NAMES = {
  name: 'name',
  amount: 'amount',
  notes: 'notes',
  dueDate: 'dueDate',
  term: 'term',
  occurrence: 'occurrence',
  termSchedule: 'termSchedule',
};

export const BILLS_ERROR_MESSAGES = {
  name: 'Please add a name',
  amount: 'Please add an amount',
  default: 'This field is required',
  occurrence: 'Please select an occurrence',
  dueDate: 'Please add a date',
  term: 'Please add the the span of term with the correct unit',
  termSchedule: 'Please add the the span of term with the correct unit',
};

export const BILLS_OCCURRENCE_LIST = [
  { name: 'Monthly', value: 1 },
  { name: 'Quarterly', value: 3 },
  { name: 'Semi-annually', value: 6 },
  { name: 'Semi-monthly', value: 0.5 },
  { name: 'Yearly', value: 12 },
];

export const BILLS_TERM_SCHEDULE = [
  { name: 'Months', value: 1 },
  { name: 'Years', value: 12 },
];

// hmm so basically i think it should be like this, in front end
// ill have a table,
// example is
// name - amount - duedate - isinstallment(maybehidden) - ispaid (terms and occurence would be hidden)
// row 1 would be august internet -  1000  - aug 15 2024 - Not installment - paid
// row 2 would be laptop payment - 3000 - every 29th of month - Installment - not paid (based on the current month)

// then when i press view in row 1 it will just show 1 bill
// then when i press view in row 2 since its an installment, it will show me all the payments needed for that installment
