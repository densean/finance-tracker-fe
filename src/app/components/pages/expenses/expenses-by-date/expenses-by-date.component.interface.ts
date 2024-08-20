export interface IExpensesByDay {
  name: string;
  category: string;
  amount: number;
  date: Date;
}

export interface IExpensesByDayRequest {
  month: number;
  year: number;
}
