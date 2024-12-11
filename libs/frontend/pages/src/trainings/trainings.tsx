import { useEffect, useState } from 'react';

import { FilterTrainings, Header, TrainingCard } from '@fitfriends/components';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { fetchTrainingsAction, getFilter, getTrainings, getTrainingsLoadingStatus } from '@fitfriends/store';
import { DEFAULT_TRAINING_COUNT_LIMIT } from '@fitfriends/core';
import { getParamsString, RequestStatus } from '@fitfriends/utils';
import { LoadingPage } from '../loading-page/loading-page';


export function Trainings() {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const loadingStatus = useAppSelector(getTrainingsLoadingStatus);
  const [visibleItems, setVisibleItems] = useState<number>(DEFAULT_TRAINING_COUNT_LIMIT);
  const filter = useAppSelector(getFilter);

  useEffect(() => {
    const queryParam = getParamsString(filter, visibleItems);
    console.log(queryParam)
    dispatch(fetchTrainingsAction(queryParam))
  }, [dispatch, visibleItems, filter]);

  if(loadingStatus !== RequestStatus.Success) {
    return <LoadingPage />
  }

  const handleMoreButtonClick = () => {
    return setVisibleItems((prevState) => prevState + DEFAULT_TRAINING_COUNT_LIMIT)
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <FilterTrainings />
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainings.map((training) => (
                    <li className="training-catalog__item" key={training.id}>
                      <TrainingCard training={training} />
                    </li>
                  ))}
                </ul>
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button" onClick={handleMoreButtonClick}>Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Trainings;
