import { Level } from './level.interface';
import { Location } from './location.interface';
import { Role } from './role.interface';
import { Sex } from './sex.interface';
import { Time } from './time.interface';
import { TrainingType } from './training-type.interface';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  sex: Sex;
  dateOfBirth: Date;
  description: string;
  location: Location;
  picture: string;
  createdAt?: Date;
  level: Level;
  trainingTypes: TrainingType[];
  trainingTime: Time;
  caloriesAll: number;
  caloriesPerDay: number;
  role: Role;
}
