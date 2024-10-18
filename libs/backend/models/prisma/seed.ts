import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { Level, Location, Role, Sex, Time, TrainingType } from '../../../shared/core/src/index';

const DEFAULT_QUANTITY_OF_TRAININGS = 5;
const DEFAULT_QUANTITY_OF_USERS = 5;
const DEFAULT_PASSWORD = '123456';
const SALT_ROUNDS = 10;

const enumKeys = (myEnum) => (Object.keys(myEnum).map(key => myEnum[key]).filter(value => typeof value === 'string') as string[])

const level = enumKeys(Level);
const location = enumKeys(Location);
const trainingType = enumKeys(TrainingType);
const trainingTime = enumKeys(Time);
const sex = enumKeys(Sex);
const roles = Object.values(Role);

function getTraining() {
  return {
    name: faker.commerce.productName(),
    picture: faker.system.fileName(),
    level: faker.helpers.arrayElement(level),
    trainingType: faker.helpers.arrayElement(trainingType),
    trainingTime: faker.helpers.arrayElement(trainingTime),
    price: faker.number.int({max: 10000}),
    calories: faker.number.int({max: 5000}),
    description: faker.lorem.paragraph(),
    sex: faker.helpers.arrayElement(sex),
    video: faker.system.filePath(),
    rating: faker.number.float({fractionDigits: 1, max: 10, min: 1}),
    trainer: faker.person.fullName(),
    special: false
  }
}

function getTrainings(count: number) {
  return Array.from({length: count}, getTraining);
}

async function getPasswordHash(password: string) {
  const salt = await genSalt(SALT_ROUNDS);
  return hash(password, salt);
}

function getUser() {
  return {
    name: faker.person.fullName(),
    passwordHash: DEFAULT_PASSWORD,
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    sex: faker.helpers.arrayElement(sex),
    dateOfBirth: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    location: faker.helpers.arrayElement(location),
    picture: faker.system.filePath(),
    level: faker.helpers.arrayElement(level),
    trainingTypes: faker.helpers.arrayElements(trainingType),
    trainingTime: faker.helpers.arrayElement(trainingTime),
    caloriesAll: faker.number.int({max: 5000}),
    caloriesPerDay: faker.number.int({max: 1000}),
    role: faker.helpers.arrayElement(roles)
  }
}

function getUsers(count: number) {
  return Array.from({length: count}, getUser);
}

async function seedDB(prismaClient: PrismaClient, trainingsQty: number, usersQty: number) {
  const mockTrainings = getTrainings(trainingsQty);
  for(const training of mockTrainings) {
    await prismaClient.training.create({
      data: training
    });
  }

  const mockUsers = getUsers(usersQty);
  for(const user of mockUsers) {
    const passwordHash = await getPasswordHash(user.passwordHash);
    await prismaClient.user.create({
      data: { ...user, passwordHash }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();
  const trainingsQty = DEFAULT_QUANTITY_OF_TRAININGS;
  const usersQty = DEFAULT_QUANTITY_OF_USERS;

  try {
    await seedDB(prismaClient, trainingsQty, usersQty);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    prismaClient.$disconnect();
  }
}

bootstrap();
