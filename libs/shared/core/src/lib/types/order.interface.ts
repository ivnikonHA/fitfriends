import { Payment } from './payment.interface';

export interface Order  {
  id?: string;
  userId: string;
  typeOfOrder: string;
  trainingId: string;
  price: number;
  quantity: number;
  payment: Payment;
  createdAt: Date;
}
