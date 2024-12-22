import { MouseEvent, useState } from 'react';
import classNames  from 'classnames';

import styles from './custom-select.module.css';

interface CustomSelectProps {
  label: string;
  placeholder: string;
  optionsList: string[];
  edit: boolean;
  onSelect: (item: string) => void;
}

export function CustomSelect({label, placeholder, optionsList, edit, onSelect}: CustomSelectProps) {
  const itemClickHandler = (evt: MouseEvent<HTMLUListElement>) => {
    setOpen(false);
    const value = evt.target as HTMLElement;
    onSelect(value.innerText);
  }

  const [open, setOpen] = useState(false);
  const selectClass = classNames(
    { 'custom-select--readonly is-disabled': !edit } ,
    'custom-select',
    { 'user-info-edit__select': edit,
    'user-info__select': !edit,
    'is-open': open }
  );
  return (
    <div
      className={selectClass}
    >
      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder">{placeholder}</div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width={15} height={6} aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox" onClick={itemClickHandler}>
        {optionsList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default CustomSelect;
