import { OrderBy, SortDirection } from '@fitfriends/core';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { fetchTrainingsAction, getTrainings, getTrainingsLoadingStatus } from '@fitfriends/store';
import { AppRoute, createParamsString, RequestStatus } from '@fitfriends/utils';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingPage } from '@fitfriends/pages';
import TrainingCard from '../training-card/training-card';

const POPULAR_TRAINIGS_LIMIT = 4;

export function PopularTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const loadingStatus = useAppSelector(getTrainingsLoadingStatus);

  useEffect(() => {
    const queryString = createParamsString(
      {
        limit: POPULAR_TRAINIGS_LIMIT,
        orderBy: OrderBy.RATING,
        sortDirection: SortDirection.Desc,
        page: 1,
        where: {}
      }
    );
    dispatch(fetchTrainingsAction(queryString));
  }, [dispatch]);

  if(loadingStatus !== RequestStatus.Success) {
    return <LoadingPage />
  }

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <Link className="btn-flat popular-trainings__button" to={AppRoute.Trainings}>
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </Link>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {
              trainings.map((training) => (
                <li className='popular-trainings__item' key={training.id}>
                  <TrainingCard training={training} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
