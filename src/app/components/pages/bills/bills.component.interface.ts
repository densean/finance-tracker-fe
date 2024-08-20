export interface IBills {
  id: number;
  name: string;
  amount: number;
  dueDate: Date;
  notes: string;
  term: number;
  occurrence: number;
  isPaid: boolean;
  isInstallment: boolean;
  paidCount: number;
}

export interface IBillRequest {
  name: string;
  amount: number;
  dueDate: Date;
  notes: string;
  term: number;
  occurrence: number;
}

export interface IBillDisplay {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  notes: string;
  term: number;
  occurrence: number;
  isPaid: boolean;
}
