import {
  type ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./range-slider.scss";

type RangeSliderProps = {
  isShowTooltip?: boolean;
  max: number;
  min: number;
  onChange?: Dispatch<SetStateAction<number[]>>;
  step: number;
  value: number[];
};

function RangeSliderComponent(
  {
    isShowTooltip = false,
    max,
    min,
    onChange,
    step,
    value,
  }: RangeSliderProps
): JSX.Element {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const [minTooltip, setMinTooltip] = useState(value[0]);
  const [maxTooltip, setMaxTooltip] = useState(value[1]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const minTooltipRef = useRef<HTMLDivElement | null>(null);
  const maxTooltipRef = useRef<HTMLDivElement | null>(null);
  const zIndexMin = "10";
  const zIndexMax = "20";

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
    setMinTooltip(value[0]);
    setMaxTooltip(value[1]);
  }, [value])

  useEffect(() => {
    console.log('Slider useeffect')
    if (
      trackRef &&
      trackRef.current &&
      minTooltipRef &&
      minTooltipRef.current &&
      maxTooltipRef &&
      maxTooltipRef.current
    ) {
      const minLeft = `${((minValue - min) / (max - min)) * 100}%`;
      const maxRight = `${((max - maxValue) / (max - min)) * 100}%`;
      trackRef.current.style.left = "0%";
      trackRef.current.style.right = "0%";
      minTooltipRef.current.style.left = minLeft;
      minTooltipRef.current.style.transform = `translateX(-${minLeft})`;
      maxTooltipRef.current.style.right = maxRight;
      maxTooltipRef.current.style.transform = `translateX(${maxRight})`;
    }
  }, [max, maxValue, min, minValue]);

  const handleChangeMin = (event?: ChangeEvent<HTMLInputElement>) => {
    if (minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
      minInputRef.current.style.zIndex = zIndexMax;
      maxInputRef.current.style.zIndex = zIndexMin;
    }
    if (minTooltipRef && minTooltipRef.current && maxTooltipRef && maxTooltipRef.current) {
      minTooltipRef.current.style.zIndex = zIndexMax;
      maxTooltipRef.current.style.zIndex = zIndexMin;
    }
    const value = Number(event?.target.value);
    if (value <= maxValue) {
      setMinValue(value);
      setMinTooltip(value);
      onChange?.([value, maxValue]);
    }
  };

  const handleChangeMax = (event?: ChangeEvent<HTMLInputElement>) => {
    if (minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
      minInputRef.current.style.zIndex = zIndexMin;
      maxInputRef.current.style.zIndex = zIndexMax;
    }
    if (minTooltipRef && minTooltipRef.current && maxTooltipRef && maxTooltipRef.current) {
      minTooltipRef.current.style.zIndex = zIndexMin;
      maxTooltipRef.current.style.zIndex = zIndexMax;
    }
    const value = Number(event?.target.value);
    if (value >= minValue) {
      setMaxValue(value);
      setMaxTooltip(value);
      onChange?.([minValue, value]);
    }
  };

  return (
    <div className={"RangeSlider"}>
      <div className="RangeSlider-Slider">
        <div className="RangeSlider-Slider-Track" ref={trackRef}></div>
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Min"
          max={max}
          min={min}
          name="min"
          onChange={handleChangeMin}
          ref={minInputRef}
          step={step}
          type="range"
          value={minValue}
        />
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Max"
          max={max}
          min={min}
          name="max"
          onChange={handleChangeMax}
          ref={maxInputRef}
          step={step}
          type="range"
          value={maxValue}
        />
        {isShowTooltip && (
          <>
            <div className="RangeSlider-Slider-WapperTooltip" ref={minTooltipRef}>
              <div className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Min">
                {minTooltip}
              </div>
            </div>
            <div className="RangeSlider-Slider-WapperTooltip" ref={maxTooltipRef}>
              <div className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Max">
                {maxTooltip}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
