//import styles from './user-info.module.css';

import { Level, Location, Role, Sex } from '@fitfriends/core';
import { UserRdo } from '@fitfriends/user';
import { useState } from 'react';
import CustomSelect from '../custom-select';

interface UserInfoProps {
  userInfo: UserRdo
}
export function UserInfo({userInfo}: UserInfoProps) {
  const isCoach = userInfo.role === Role.COACH;
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo.name,
    avatar: userInfo.avatar,
    location: userInfo.location,
    sex: userInfo.sex,
    level: userInfo.level,
    ready: true
  });

  return (
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
            />
            <span className="input-load-avatar__avatar">
              <img src={userInfo.avatar ? `http://localhost:3001/static/${userInfo.avatar}`: 'img/content/avatars/users/photo-1.png'} width={98} height={98} alt="user" />
            </span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post">
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button"
          aria-label="Редактировать"
          onClick={() => setEdit((prev) => !prev)}
        >
          <svg width={12} height={12} aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>{edit ? 'Сохранить': 'Редактировать'}</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" defaultValue={userInfo.name} disabled={!edit} />
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea name="description" placeholder=" " disabled={!edit} defaultValue={userInfo.description} />
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input type="checkbox" name="ready-for-training" defaultChecked />
              <span className="custom-toggle__icon">
                <svg width={9} height={6} aria-hidden="true">
                  <use xlinkHref="#arrow-check" />
                </svg>
              </span>
              <span className="custom-toggle__label">{`Готов ${isCoach? 'тренировать': 'тренироваться'}`}</span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="yoga" /><span className="btn-checkbox__btn">Йога</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="running" /><span className="btn-checkbox__btn">Бег</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="aerobics" /><span className="btn-checkbox__btn">Аэробика</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="boxing" /><span className="btn-checkbox__btn">Бокс</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="power" /><span className="btn-checkbox__btn">Силовые</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="pilates" /><span className="btn-checkbox__btn">Пилатес</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="stretching" /><span className="btn-checkbox__btn">Стрейчинг</span>
              </label>
            </div>
            <div className="btn-checkbox">
              <label>
                <input className="visually-hidden" type="checkbox" name="specialization" defaultValue="crossfit" /><span className="btn-checkbox__btn">Кроссфит</span>
              </label>
            </div>
          </div>
        </div>
        <CustomSelect
          label='Локация'
          placeholder={formData.location}
          optionsList={Object.values(Location)}
          edit={edit}
          onSelect={(item) => setFormData((prev) => ({...prev, location: item as Location}))}
        />
        <CustomSelect
          label='Пол'
          placeholder={formData.sex}
          optionsList={Object.values(Sex)}
          edit={edit}
          onSelect={(item) => setFormData((prev) => ({...prev, sex: item as Sex}))}
        />
        <CustomSelect
          label='Уровень'
          placeholder={formData.level}
          optionsList={Object.values(Level)}
          edit={edit}
          onSelect={(item) => setFormData((prev) => ({...prev, level: item as Level}))}
        />
      </form>
    </section>
  );
}

export default UserInfo;
