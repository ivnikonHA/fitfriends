//import styles from './intro.module.css';
import { Link, Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@fitfriends/utils';
import { useAppSelector } from '@fitfriends/hooks';
import { getAuthorizationStatus } from '@fitfriends/store';

export function Intro() {
  const authorized = useAppSelector(getAuthorizationStatus);
  if(authorized === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }
  return (
    <div className="wrapper">
    <main>
      <div className="intro">
        <div className="intro__background">
          <picture>
            <source type="image/webp" srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x" />
            <img src="img/content/sitemap//background.jpg" srcSet="img/content/sitemap//background@2x.jpg 2x" width={1440} height={1024} alt="Фон с бегущей девушкой" />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg className="intro__icon" width={60} height={60} aria-hidden="true">
            <use xlinkHref="#icon-logotype" />
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source type="image/webp" srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x" />
              <img src="img/content/sitemap//title-logo.png" srcSet="img/content/sitemap//title-logo@2x.png 2x" width={934} height={455} alt="Логотип Fit Friends" />
            </picture>
          </div>
          <div className="intro__buttons">
            <Link className="btn intro__button" to={AppRoute.Register}>Регистрация</Link>
            <p className="intro__text">Есть аккаунт? <Link className="intro__link" to={AppRoute.Login}>Вход</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default Intro;
