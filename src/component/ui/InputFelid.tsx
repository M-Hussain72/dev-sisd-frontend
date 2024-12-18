import { useState, useRef } from 'react';
type InputSpreadProps = {
  title: string;
  error?: boolean | string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputFelid: React.FC<InputSpreadProps> = ({ title, error, errorMessage, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [labelWrap, setLabelWrap] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);

  function showAsLabel() {
    focusInput();
    setIsInputFocus(true);
    setLabelWrap(true);
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsInputFocus(false);
    if (!e.currentTarget.value) {
      setLabelWrap(false);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className=" relative  ">
      <input
        ref={inputRef}
        className={` focus:border-themeBlue py-3  xs:w-[440px] w-[300px] outline-none px-3 rounded-lg border-[1px] bg-[#FAFAFA] disabled:text-themeGray
          ${labelWrap ? `  ${error ? 'border-red-500' : ' border-themeBlack'}` : 'border-[#CCCCCC]'} `}
        // onFocusCapture={() => console.log('onFocusC')}
        onFocus={showAsLabel}
        onBlur={onBlur}
        {...props}
      ></input>
      {!isInputFocus && error && <p className=" w-fit text-red-500 text-xs my-1 ">{errorMessage}</p>}
      <label
        className={`
                transition-all  duration-200 capitalize
                ${
                  labelWrap
                    ? ` absolute left-3 -top-3 px-1 h-[13px] text-[12px] font-light bg-[#FAFAFA] ${isInputFocus ? ' text-themeBlue' : `  ${error ? 'text-red-500' : ' text-themeBlack'}`}`
                    : ' absolute left-6 top-[9px]  text-[#949697] text-lg  cursor-pointer'
                }`}
        onClick={showAsLabel}
      >
        {title}
      </label>
    </div>
  );
};

export default InputFelid;
