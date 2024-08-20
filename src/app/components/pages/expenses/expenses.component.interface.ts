export interface IExpenses {
  name: string;
  category: string;
  amount: number;
  paymentMethod: string;
  remarks: string;
  date: Date;
  id: number;
}

export interface IExpensesNoRemarks {
  id: number;
  name: string;
  category: string;
  amount: number | string;
  paymentMethod: string;
  date: Date;
}

export interface IExpensesRequest {
  name: string;
  category: string;
  amount: number;
  paymentMethod: string;
  remarks: string;
  date: Date;
}

export interface IExpensesViewDisplay {
  name: string;
  category: string;
  amount: string;
  paymentMethod: string;
  remarks: string;
  date: Date;
  id: string;
}
