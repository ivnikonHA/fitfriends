//import styles from './user-info.module.css';

import { Level, Location, Role, Sex, TrainingType } from '@fitfriends/core';
import { UserRdo } from '@fitfriends/user';
import { ChangeEvent, useState } from 'react';
import CustomSelect from '../custom-select';
import { ChangeHandler, updateUserAction } from '@fitfriends/store';
import { fileUploadService } from '@fitfriends/services';
import { UpdateUserDto } from 'libs/backend/account/user/src/lib/dto/update-user.dto';
import { useAppDispatch } from '@fitfriends/hooks';

interface UserInfoProps {
  userInfo: UserRdo
}
export function UserInfo({userInfo}: UserInfoProps) {
  const dispatch = useAppDispatch();
  const isCoach = userInfo.role === Role.COACH;
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo.name,
    description: userInfo.description,
    avatar: userInfo.avatar,
    location: userInfo.location,
    sex: userInfo.sex,
    level: userInfo.level,
    ready: true,
    trainingTypes: userInfo.trainingTypes
  });
  const [photo, setPhoto] = useState<File | undefined>();

  const handleFieldChange: ChangeHandler = (evt) => {
      const { name, value } = evt.currentTarget;
      setFormData({ ...formData, [name]: value });
    };

  const handlePhotoUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setPhoto(evt.target.files[0]);
  };

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let trainings = [...formData.trainingTypes];
    const currentTraining = evt.target.value as TrainingType;
    if (trainings.includes(currentTraining)) {
      trainings = trainings.filter((item) => item !== currentTraining);
    } else {
      trainings.push(currentTraining);
    }
    setFormData({...formData, trainingTypes: trainings})
  }

  const handleSubmitForm = async () => {
    if(edit) {
      let avatar = '';
      if(photo) {
        const response = await fileUploadService(photo);
        avatar = `${response.subDirectory}/${response.hashName}`;
        setFormData({...formData, avatar});
      }
      const dto: UpdateUserDto = {
        ...userInfo,
        ...formData,
        avatar
      }
      dispatch(updateUserAction(dto)).catch((e) => {
        console.log(e);
        return;
      });
    }
    setEdit((prev) => !prev);
  }

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
              disabled={!edit}
              onChange={handlePhotoUpload}
            />
            <span className="input-load-avatar__avatar">
            {
              photo ? <img src={URL.createObjectURL(photo)} width="98" height="98" alt="user" />
              : formData.avatar
              ? <img src={`http://localhost:3001/static/${formData.avatar}`} width="98" height="98" alt="user" />
              : <svg width={20} height={20} aria-hidden="true"><use xlinkHref="#icon-import" /></svg>
            }
            </span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post">
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button"
          aria-label="Редактировать"
          onClick={handleSubmitForm}
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
                <input
                  type="text"
                  name="name"
                  onChange={handleFieldChange}
                  value={formData.name}
                  disabled={!edit}
                />
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                disabled={!edit}
                value={formData.description}
                onChange={handleFieldChange}
              />
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
          <div className={`specialization-checkbox user-info__specialization`}>
            {Object.values(TrainingType).map((item) => (
              <div className="btn-checkbox" key={item}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue={item}
                    onChange={handleCheckboxChange}
                    checked={formData.trainingTypes.includes(item)}
                    disabled={!edit}
                  />
                  <span className="btn-checkbox__btn">{item}</span>
                </label>
              </div>
            ))}
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
