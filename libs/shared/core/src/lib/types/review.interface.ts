export interface Review {
  id?: string;
  userId: string;
  trainingId: string;
  rate: number;
  text: string;
  createdAt: Date;
}
