import { Link } from 'react-router-dom';

import { Training } from '@fitfriends/core';
import { TrainingPage } from '@fitfriends/pages';
import { AppRoute } from '@fitfriends/utils';

interface TrainingCardProps {
  training: Training;
}
export function TrainingCard({training}: TrainingCardProps) {
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp" srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x" />
            <img src="img/content/thumbnails/training-02.jpg" srcSet="img/content/thumbnails/training-02@2x.jpg 2x" width={330} height={190} alt=""/>
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {training.price}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>{`#${training.trainingType.toLowerCase()}`}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>{`#${training.calories}ккал`}</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg><span className="thumbnail-training__rate-value">{training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link className="btn btn--small thumbnail-training__button-catalog" to={AppRoute.Training} state={{training}}>Подробнее</Link>
          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
        </div>
      </div>
    </div>
  );
}

export default TrainingCard;
