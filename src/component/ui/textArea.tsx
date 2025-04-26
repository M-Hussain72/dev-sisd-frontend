import { useState, useRef, useEffect } from 'react';
type InputSpreadProps = {
  title: string;
  error?: boolean | string;
  errorMessage?: string;
  width?: `w-[${string}]`;
  handleBlur?: () => void;
  handleFocus?: () => void;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField: React.FC<InputSpreadProps> = ({
  title,
  error,
  errorMessage,
  handleBlur,
  handleFocus,
  width,
  ...props
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [labelWrap, setLabelWrap] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  function onFocus() {
    focusInput();
    setIsInputFocus(true);
    setLabelWrap(true);
    if (handleFocus) {
      handleFocus();
    }
  }

  useEffect(() => {
    if (!!props?.value) {
      setLabelWrap(true);
    }
  }, []);

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    setIsInputFocus(false);
    if (!e.currentTarget.value) {
      setLabelWrap(false);
    }

    // for further add onBlur functionality if aviable
    if (handleBlur) handleBlur();
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className=" relative  ">
      <textarea
        ref={inputRef}
        className={
          ` max-h-[200px] min-h-[160px] focus:border-themeBlue py-3   outline-none px-3 rounded-lg border-[1px] bg-[#FAFAFA] disabled:text-themeGray
          ${labelWrap ? `  ${error ? 'border-red-500' : ' border-themeBlack'}` : 'border-[#CCCCCC]'} ` +
          (!width ? '  w-full min-w-[280px] ' : width)
        }
        // onFocusCapture={() => console.log('onFocusC')}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      ></textarea>
      {!isInputFocus && error && <p className=" w-fit text-red-500 text-xs my-1 ">{errorMessage}</p>}
      <label
        className={`
                transition-all  duration-200 capitalize
                ${
                  labelWrap
                    ? ` absolute left-3 -top-3 px-1 h-[13px] text-[12px] font-light bg-[#FAFAFA] ${isInputFocus ? ' text-themeBlue' : `  ${error ? 'text-red-500' : ' text-themeBlack'}`}`
                    : ' absolute left-6 top-[9px]  text-[#949697] text-lg  cursor-pointer'
                }`}
        onClick={onFocus}
      >
        {title}
      </label>
    </div>
  );
};

export default TextAreaField;
