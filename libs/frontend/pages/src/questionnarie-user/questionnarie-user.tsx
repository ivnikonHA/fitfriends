import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Level, Time, TrainingType } from '@fitfriends/core';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { getUserData, updateUserAction } from '@fitfriends/store';

export interface Interview {
  trainingType: TrainingType[];
  trainingTime: Time;
  level: Level;
  caloriesAll: number;
  caloriesPerDay: number;
}

export function QuestionnarieUser() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserData).id;
  const [formData, setFormData] = useState<Interview>({
    trainingType: [],
    trainingTime: undefined,
    level: undefined,
    caloriesAll: 0,
    caloriesPerDay: 0
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(name === 'caloriesAll' || name === 'caloriesPerDay') {
      setFormData((prevNewUser) => ({
        ...prevNewUser,
        [name]: parseInt(value, 10)
      }));
    } else {
      setFormData((prevNewUser) => ({
        ...prevNewUser,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let trainings = formData.trainingType;
    const currentTraining = evt.target.value as TrainingType;
    if (trainings.includes(evt.target.value as TrainingType)) {
      trainings = trainings.filter((item) => item !== currentTraining);
    } else {
      trainings.push(currentTraining);
    }
    setFormData({...formData, trainingType: trainings})
  }

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(formData.trainingType.length === 0 || formData.trainingType.length > 3) {
      return;
    }
    if(!formData.level) {
      return;
    }
    if(!formData.trainingTime) {
      return;
    }
    console.log(formData)
    dispatch(updateUserAction({...formData, id: userId}));
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Опросник — FitFriends</title>
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
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="post" onSubmit={handleSubmitForm}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {Object.keys(TrainingType).map((item) => (
                            <div className="btn-checkbox" key={item}>
                              <label>
                                <input
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="specialisation"
                                  defaultValue={TrainingType[item]}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="btn-checkbox__btn">{TrainingType[item]}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {
                            Object.keys(Time).map((item) => (
                              <div className="custom-toggle-radio__block" key={item}>
                                <label>
                                  <input type="radio" name="trainingTime" value={Time[item]} onChange={handleFieldChange}/>
                                  <span className="custom-toggle-radio__icon" />
                                  <span className="custom-toggle-radio__label">{Time[item]}</span>
                                </label>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {
                            Object.keys(Level).map((item) => (
                              <div className="custom-toggle-radio__block" key={item}>
                                <label>
                                  <input type="radio" name="level" value={Level[item]} onChange={handleFieldChange}/>
                                  <span className="custom-toggle-radio__icon" />
                                  <span className="custom-toggle-radio__label">{Level[item]}</span>
                                </label>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input type="number" name="caloriesAll" value={formData.caloriesAll} onChange={handleFieldChange}/>
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste">
                          <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input type="number" name="caloriesPerDay" value={formData.caloriesPerDay} onChange={handleFieldChange} />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
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

export default QuestionnarieUser;
