import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { FilterType, SortDirection } from '@fitfriends/core';
import { useAppDispatch, useAppSelector, useDebounce } from '@fitfriends/hooks'
import { changeFilter, getFilter, getMaxCalories, getMaxPrice, getMinCalories, getMinPrice } from '@fitfriends/store';
import { Link } from 'react-router-dom';
import { AppRoute } from '@fitfriends/utils';
import { RangeSlider } from '../range-slider/range-slider';

// interface FilterTrainingsProps {
//   filter: FilterType;
//   setFilter: Dispatch<SetStateAction<FilterType>>;
// }

export function FilterTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>(useAppSelector(getFilter));
  const debouncedFilter = useDebounce(filter, 1000);
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);
  const minCalories = useAppSelector(getMinCalories);
  const maxCalories = useAppSelector(getMaxCalories);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const debouncedPriceRange = useDebounce(priceRange, 1000);

  // useEffect(() => setFilter((prev) => ({
  //   ...prev,
  //   caloriesMin: minCalories,
  //   caloriesMax: maxCalories,
  //   priceMin: minPrice,
  //   priceMax: maxPrice
  // })),[]);

  // useEffect(() => {
  //   dispatch(changeFilter(debouncedFilter));
  // }, [debouncedFilter]);

  // useEffect(() => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     priceMin: debouncedPriceRange[0],
  //     priceMax: debouncedPriceRange[1]
  //   }));
  // },[debouncedPriceRange]);

  const handleSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setFilter((prev) => ({
      ...prev,
      sortDirection: value as SortDirection
    }));
  };

  const handleFreeTrainings = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      priceMin: 0,
      priceMax: 0,
      sortDirection: evt.target.value as SortDirection
    }));
  }
  console.log(priceRange)
  // const handleRangeChange = (value) => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     priceMin: value[0],
  //     priceMax: value[1]
  //   }));
  // }

  // useEffect(() => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     priceMin: range[0],
  //     priceMax: range[1]
  //   }))
  // },[debouncedRange])
  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <Link
          className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
          type="button"
          to={AppRoute.Main}
        >
          <svg width={14} height={10} aria-hidden="true">
            <use xlinkHref="#arrow-left" />
          </svg><span>Назад</span>
        </Link>
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <div className="gym-catalog-form__block gym-catalog-form__block--price">
            <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input
                  type="number"
                  id="text-min"
                  name="text-min"
                  onChange={(evt) => setPriceRange((prev) => ([+evt.target.value, prev[1]]))}
                  value={priceRange[0].toString()}
                />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input
                  type="number"
                  id="text-max"
                  name="text-max"
                  onChange={(evt) => setPriceRange((prev) => ([prev[0], +evt.target.value]))}
                  value={priceRange[1].toString()}
                />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            {/* <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div> */}
            <RangeSlider
              isShowTooltip={true}
              max={maxPrice}
              min={minPrice}
              onChange={setPriceRange}
              step={1}
              value={priceRange}
            />
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--calories">
            <h4 className="gym-catalog-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input type="number" id="text-min-cal" name="text-min-cal" />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input type="number" id="text-max-cal" name="text-max-cal" />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <ul className="gym-catalog-form__check-list">
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">йога</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">силовые</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type" name="type" defaultChecked /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">кроссфит</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" defaultChecked /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">бокс</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">бег</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">аэробика</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">пилатес</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" /><span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg></span><span className="custom-toggle__label">стрейчинг</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input type="radio" name="sort" value={SortDirection.Asc} onChange={handleSortChange} checked={filter.sortDirection===SortDirection.Asc}/>
                <span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input type="radio" name="sort" value={SortDirection.Desc} onChange={handleSortChange} checked={filter.sortDirection===SortDirection.Desc}/>
                <span className="btn-radio-sort__label">Дороже</span>
              </label>
              <label>
                <input type="radio" name="sort" value={SortDirection.Free} onChange={handleFreeTrainings} checked={filter.sortDirection===SortDirection.Free}/>
                <span className="btn-radio-sort__label">Бесплатные</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
