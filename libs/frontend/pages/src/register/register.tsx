//import styles from './register.module.css';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { Location, NameLength, PasswordLength, Role, Sex } from '@fitfriends/core';
import { CreateUserDto } from '@fitfriends/user';
import { ChangeHandler, loginAction, registerAction } from '@fitfriends/store';
import { useAppDispatch } from '@fitfriends/hooks';
import { AppRoute, getDefaultInterviewResult } from '@fitfriends/utils';
import { fileUploadService } from '@fitfriends/services';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectRef = useRef<HTMLDivElement>(null);
  const selectTextRef = useRef<HTMLSpanElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isUserAgreementChecked, setIsUserAgreementChecked] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    dateOfBirth: undefined,
    location: Location.PETROGRADSKAYA,
    sex: Sex.MALE,
    role: Role.COACH,
    picture: '',
    ready: false
  });

  const [photo, setPhoto] = useState<File | undefined>();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevNewUser) => ({
      ...prevNewUser,
      [name]: value
    }));
  };

  const handleFieldChange: ChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectButtonClick = () => {
    if(isSelectOpen) {
      selectRef.current.classList.remove('is-open');
      setIsSelectOpen(false);
    } else {
      selectRef.current?.classList.add('is-open');
      setIsSelectOpen(true);
    }
  }
  const handleSelectItemClick = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    selectRef.current?.classList.remove('is-open');
    setFormData({...formData, location: evt.currentTarget.dataset.value as Location});
  }

  const handleSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let avatar = '';
    if(photo) {
      const response = await fileUploadService(photo);
      avatar = `${response.subDirectory}/${response.hashName}`;
      setFormData({...formData, avatar});
    }
    const interviewData = getDefaultInterviewResult(formData.sex);
    const dto: CreateUserDto = {
      ...formData,
      avatar,
      dateOfBirth: new Date(formData.dateOfBirth),
      ...interviewData
    };
    dispatch(registerAction(dto))
    .then(() => dispatch(loginAction({email: formData.email, password: formData.password})))
    .then(() => navigate(AppRoute.Interview));
  }

  const handlePhotoUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setPhoto(evt.target.files[0]);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Регистрация — FitFriends</title>
      </Helmet>
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width={750} height={284} aria-hidden="true">
            <use xlinkHref="#logo-big" />
          </svg>
          <svg className="background-logo__icon" width={343} height={343} aria-hidden="true">
            <use xlinkHref="#icon-logotype" />
          </svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="post" onSubmit={handleSubmitForm}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input
                            className="visually-hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handlePhotoUpload}
                          />
                          <span className="input-load-avatar__btn input-load-avatar__avatar">
                            {
                              photo ? <img src={URL.createObjectURL(photo)} width="98" height="98" alt="user" />
                              : <svg width={20} height={20} aria-hidden="true"><use xlinkHref="#icon-import" /></svg>
                            }
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="text"
                              name="name"
                              onChange={handleFieldChange}
                              value={formData.name}
                              required
                              minLength={NameLength.Min}
                              maxLength={NameLength.Max}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="email"
                              name="email"
                              onChange={handleFieldChange}
                              value={formData.email}
                              required
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Дата рождения</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="date"
                              name="dateOfBirth"
                              max="2099-12-31"
                              onChange={handleFieldChange}
                              value={formData.dateOfBirth}
                            />
                          </span>
                        </label>
                      </div>
                      <div
                        className="custom-select custom-select--not-selected not-empty"
                        ref={selectRef}
                      >
                        <span className="custom-select__label">Ваша локация</span>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={handleSelectButtonClick}
                        >
                          <span className="custom-select__text" ref={selectTextRef}>
                            {formData.location}
                          </span>
                          <span className="custom-select__icon">
                            <svg width={15} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-down" />
                            </svg></span></button>
                        <ul className="custom-select__list" role="listbox">
                          {Object.values(Location).map((item) =>
                            <li
                              className='custom-select__item'
                              data-value={item}
                              key={item}
                              onClick={handleSelectItemClick}
                            >
                              {item}
                            </li>)}
                        </ul>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="password"
                              name="password"
                              autoComplete="off"
                              onChange={handleFieldChange}
                              value={formData.password}
                              required
                              minLength={PasswordLength.Min}
                              maxLength={PasswordLength.Max}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                defaultChecked
                                onChange={handleRadioChange}
                                value={Sex.MALE}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">Мужской</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                onChange={handleRadioChange}
                                value={Sex.FEMALE}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">Женский</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                onChange={handleRadioChange}
                                value={Sex.DONT_MATTER}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">Неважно</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio" name="role"
                              value={Role.COACH}
                              defaultChecked={true}
                              onChange={handleRadioChange}
                            />
                            <span className="role-btn__icon">
                              <svg width={12} height={13} aria-hidden="true">
                                <use xlinkHref="#icon-cup" />
                              </svg>
                            </span>
                            <span className="role-btn__btn">Я хочу тренировать</span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value={Role.SPORTSMAN}
                              onChange={handleRadioChange}
                            />
                            <span className="role-btn__icon">
                              <svg width={12} height={13} aria-hidden="true">
                                <use xlinkHref="#icon-weight" />
                              </svg>
                            </span>
                            <span className="role-btn__btn">Я хочу тренироваться</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          defaultValue="user-agreement"
                          name="user-agreement"
                          onChange={() => setIsUserAgreementChecked((prevState) => !prevState)}
                        />
                        <span className="sign-up__checkbox-icon">
                          <svg width={9} height={6} aria-hidden="true">
                            <use xlinkHref="#arrow-check" />
                          </svg>
                        </span>
                        <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit" ref={submitButtonRef} disabled={!isUserAgreementChecked}>Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
