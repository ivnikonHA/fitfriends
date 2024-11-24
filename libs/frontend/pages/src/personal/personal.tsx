import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Header, PersonalCoach, PersonalUser, UserInfo } from '@fitfriends/components';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { fetchUserAction, getUserData, getUserInfo } from '@fitfriends/store';
import LoadingPage from '../loading-page/loading-page';
import { Role } from '@fitfriends/core';


export function PersonalPage() {
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
              {
                userInfo.role === Role.COACH ?
                <PersonalCoach />
                : <PersonalUser userInfo={userInfo} />
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PersonalPage;
