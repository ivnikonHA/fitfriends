import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Level, Role, Time, TrainingType } from '@fitfriends/core';
import { useAppDispatch, useAppSelector } from '@fitfriends/hooks';
import { getUserData, updateUserAction } from '@fitfriends/store';

export interface Interview {
  trainingTypes: TrainingType[];
  trainingTime: Time;
  level: Level;
  caloriesAll: number;
  caloriesPerDay: number;
  certificate: string;
  description: string;
  extraTraining: boolean;
}

// function getUserRole() {
//   return Role.SPORTSMAN;
// }

export function Questionnarie() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  console.log(userData);
  const userId = userData.id;
  const userRole = userData.role;
  const questionnaireClass = userRole === Role.COACH ? 'coach' : 'user';
  const [formData, setFormData] = useState<Interview>({
    trainingTypes: [],
    trainingTime: undefined,
    level: undefined,
    caloriesAll: 0,
    caloriesPerDay: 0,
    certificate: '',
    description: '',
    extraTraining: true,
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    let trainings = formData.trainingTypes;
    const currentTraining = evt.target.value as TrainingType;
    if (trainings.includes(evt.target.value as TrainingType)) {
      trainings = trainings.filter((item) => item !== currentTraining);
    } else {
      trainings.push(currentTraining);
    }
    setFormData({...formData, trainingTypes: trainings})
  }

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(formData.trainingTypes.length === 0 || formData.trainingTypes.length > 3) {
      return;
    }
    if(!formData.level) {
      return;
    }
    // if(!formData.trainingTime) {
    //   return;
    // }
    let sendData = {};
    if(userRole === Role.COACH) {
      sendData = {
        trainingTypes: formData.trainingTypes,
        level: formData.level,
        description: formData.description,
        extraTraining: formData.extraTraining,
        id: userId
      }
    } else {
      sendData = {
        trainingTypes: formData.trainingTypes,
        level: formData.level,
        trainingTime: formData.trainingTime,
        caloriesAll: formData.caloriesAll,
        caloriesPerDay: formData.caloriesPerDay
      }
    }
    dispatch(updateUserAction(sendData));
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
                  <div className={`questionnaire-${questionnaireClass}`}>
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className={`questionnaire-${questionnaireClass}__wrapper`}>
                      <div className={`questionnaire-${questionnaireClass}__block`}>
                        <span className={`questionnaire-${questionnaireClass}__legend`}>Ваша специализация (тип) тренировок</span>
                        <div className={`specialization-checkbox questionnaire-${questionnaireClass}__specializations`}>
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
                      { userRole === Role.SPORTSMAN &&
                      <div className="questionnaire-user__block">
                       <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
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
                      </div> }
                      <div className={`questionnaire-${questionnaireClass}__block`}>
                        <span className={`questionnaire-${questionnaireClass}__legend`}>Ваш уровень</span>
                        <div className={`custom-toggle-radio custom-toggle-radio--big questionnaire-${questionnaireClass}__radio`}>
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
                      { userRole === Role.SPORTSMAN ?
                        <div className="questionnaire-user__block">
                          <div className="questionnaire-user__calories-lose">
                            <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
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
                      :
                        <>
                        <div className="questionnaire-coach__block">
                          <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                          <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                            <label>
                              <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                                <svg width="20" height="20" aria-hidden="true">
                                  <use xlinkHref="#icon-import"></use>
                                </svg>
                              </span>
                              <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" />
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-coach__block">
                          <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                          <div className="custom-textarea questionnaire-coach__textarea">
                            <label>
                              <textarea name="description" placeholder=" " onChange={handleFieldChange}></textarea>
                            </label>
                          </div>
                          <div className="questionnaire-coach__checkbox">
                            <label>
                              <input
                                type="checkbox"
                                checked={formData.extraTraining}
                                name="extraTraining"
                                onChange={e => setFormData({...formData, extraTraining: e.target.checked})}
                              />
                              <span className="questionnaire-coach__checkbox-icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                            </label>
                          </div>
                        </div>
                        </>
                    }
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

export default Questionnarie;
