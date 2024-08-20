export interface IDashboardExpenses {
  name: string;
  category: string;
  date: Date;
  amount: number;
}

export interface IDashboardReportCards {
  category: string;
  amount: number;
}

export interface IDashboardBills {
  name: string;
  date: Date;
  amount: number;
}
