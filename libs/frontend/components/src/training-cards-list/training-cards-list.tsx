import { Training } from '@fitfriends/core';
import TrainingCard from '../training-card/training-card';

type TrainingCardsListProps = {
  trainings: Training[]
}
export function TrainingCardsList({ trainings }: TrainingCardsListProps) {
  return (
    <ul className="training-catalog__list">
      {trainings.map((training) => (
        <li className="training-catalog__item" key={training.id}>
          <TrainingCard training={training} />
        </li>
      ))}
    </ul>
  );
}

export default TrainingCardsList;
