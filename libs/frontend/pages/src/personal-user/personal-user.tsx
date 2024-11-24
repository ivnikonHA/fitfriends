import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Header, UserInfo } from '@fitfriends/components';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { fetchUserAction, getUserData, getUserInfo } from '@fitfriends/store';
import LoadingPage from '../loading-page/loading-page';


export function PersonalUser() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserData);
  const userInfo = useAppSelector(getUserInfo);

  useEffect(() => {
    dispatch(fetchUserAction(userId.id));
  }, [userId, dispatch]);

  if(!userInfo) {
    return <LoadingPage />
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Личный кабинет — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo userInfo={userInfo} />
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" defaultValue={userInfo.caloriesPerDay} />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" defaultValue={userInfo.caloriesAll} />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-friends" />
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart" />
                        </svg>
                      </div><span className="thumbnail-link__text">Мои покупки</span></a>
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width={330} height={190} />
                        </picture>
                      </div>
                      {/* <p class="thumbnail-spec-gym__type">Ближайший зал</p> */}
                      <div className="thumbnail-spec-gym__header">
                        <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PersonalUser;
