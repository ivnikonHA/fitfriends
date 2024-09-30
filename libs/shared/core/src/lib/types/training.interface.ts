import { Level } from './level.interface';
import { Sex } from './sex.interface';
import { Time } from './time.interface';
import { TrainingType } from './training-type.interface';

export interface Training {
  id?: string;
  name: string;
  picture: string;
  level: Level;
  trainingType: TrainingType;
  trainingTime: Time;
  price: number;
  calories: number;
  description: string;
  sex: Sex;
  video: string;
  rating: number;
  trainer: string;
  special: boolean;
}
