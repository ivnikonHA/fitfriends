import { useEffect, useState } from 'react';

import { EmptyTraining, FilterTrainings, Header, TrainingCardsList } from '@fitfriends/components';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { fetchTrainingsAction, getFilter, getTotalPages, getTrainings, getTrainingsLoadingStatus } from '@fitfriends/store';
import { DEFAULT_PAGE_COUNT, DEFAULT_TRAINING_COUNT_LIMIT } from '@fitfriends/core';
import { getParamsString, RequestStatus } from '@fitfriends/utils';
import { LoadingPage } from '../loading-page/loading-page';


export function Trainings() {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const loadingStatus = useAppSelector(getTrainingsLoadingStatus);
  const filter = useAppSelector(getFilter);

  const totalPages = useAppSelector(getTotalPages);
  const [page, setPage] = useState<number>(DEFAULT_PAGE_COUNT);

  useEffect(() => {
    const queryParam = getParamsString(filter, page);
    console.log(queryParam)
    dispatch(fetchTrainingsAction(queryParam))
  }, [dispatch, page, filter]);

  if(loadingStatus !== RequestStatus.Success) {
    return <LoadingPage />
  }

  const handleMoreButtonClick = () => setPage((prevState) => prevState !== totalPages
    ? prevState + DEFAULT_PAGE_COUNT
    : prevState);

  const handleToTopButtonClick = () => setPage(DEFAULT_PAGE_COUNT);

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
                { trainings.length
                ?
                <>
                  <TrainingCardsList trainings={trainings} />
                  <div className="show-more training-catalog__show-more">
                  {
                    page === totalPages
                    ? <button className="btn show-more__button" type="button" onClick={handleToTopButtonClick}>Вернуться в начало</button>
                    : <button className="btn show-more__button" type="button" onClick={handleMoreButtonClick}>Показать еще</button>
                  }
                </div>
                </>
                : <EmptyTraining />}

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Trainings;
