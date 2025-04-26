import { Input } from '@mantine/core';
import { useState } from 'react';

const demoCoupon = ['FRIDAY50', 'COURSE20'];

export default function CouponInput() {
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');

  function handleCoupon() {
    if (coupon.length != 0) {
      const index = demoCoupon.findIndex((validCoupon) => validCoupon === coupon);
      if (index > -1) {
        setIsValidCoupon(true);
      } else {
        setIsValidCoupon(false);
        setError('Coupon is either expired or invalid');
      }
    } else {
    }
    console.log;
  }

  function handleChange(e: React.FocusEvent<HTMLInputElement>) {
    const coupon = e.currentTarget.value;
    setCoupon(coupon);
    if (isValidCoupon) {
      setIsValidCoupon(false);
    }
    if (error.length > 0) {
      setError('');
    }
  }

  const approvedIcon = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.6488 5.40906C10.9065 5.1437 10.9182 4.70068 10.675 4.41953C10.4317 4.13838 10.0256 4.12558 9.7679 4.39094L5.93056 8.34204L4.2321 6.59324C3.97438 6.32788 3.56827 6.34068 3.32503 6.62182C3.08178 6.90297 3.09352 7.346 3.35123 7.61136L5.15089 9.46437C5.58551 9.91188 6.2756 9.91188 6.71022 9.46437L10.6488 5.40906Z"
        fill="#3EAC87"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.09677 0C2.72962 0 0 2.72962 0 6.09677V7.90323C0 11.2704 2.72962 14 6.09677 14H7.90323C11.2704 14 14 11.2704 14 7.90323V6.09677C14 2.72962 11.2704 0 7.90323 0H6.09677ZM1.35484 6.09677C1.35484 3.47787 3.47787 1.35484 6.09677 1.35484H7.90323C10.5221 1.35484 12.6452 3.47787 12.6452 6.09677V7.90323C12.6452 10.5221 10.5221 12.6452 7.90323 12.6452H6.09677C3.47787 12.6452 1.35484 10.5221 1.35484 7.90323V6.09677Z"
        fill="#3EAC87"
      />
    </svg>
  );

  const closeIcon = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.69498 10.295C4.42161 10.5683 3.9784 10.5683 3.70503 10.295C3.43166 10.0216 3.43166 9.57839 3.70503 9.30503L6.01005 7L3.70503 4.69497C3.43166 4.42161 3.43166 3.97839 3.70503 3.70503C3.97839 3.43166 4.42161 3.43166 4.69497 3.70503L7 6.01005L9.30503 3.70503C9.57839 3.43166 10.0216 3.43166 10.295 3.70502C10.5683 3.97839 10.5683 4.42161 10.295 4.69497L7.98995 7L10.295 9.30503C10.5683 9.57839 10.5683 10.0216 10.295 10.295C10.0216 10.5683 9.57839 10.5683 9.30503 10.295L7 7.98995L4.69498 10.295Z"
        fill="#949697"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6.09677C0 2.72962 2.72962 0 6.09677 0H7.90323C11.2704 0 14 2.72962 14 6.09677V7.90323C14 11.2704 11.2704 14 7.90323 14H6.09677C2.72962 14 0 11.2704 0 7.90323V6.09677ZM6.09677 1.35484C3.47787 1.35484 1.35484 3.47787 1.35484 6.09677V7.90323C1.35484 10.5221 3.47787 12.6452 6.09677 12.6452H7.90323C10.5221 12.6452 12.6452 10.5221 12.6452 7.90323V6.09677C12.6452 3.47787 10.5221 1.35484 7.90323 1.35484H6.09677Z"
        fill="#949697"
      />
    </svg>
  );

  const errorLabel = (
    <span className=" flex gap-1 items-center">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.58065 6C6.58065 5.67932 6.32068 5.41935 6 5.41935C5.67932 5.41935 5.41935 5.67932 5.41935 6V9.09677C5.41935 9.41745 5.67932 9.67742 6 9.67742C6.32068 9.67742 6.58065 9.41745 6.58065 9.09677V6Z"
          fill="#FA5252"
        />
        <path
          d="M6.77419 3.67742C6.77419 3.24985 6.42759 2.90323 6 2.90323C5.57241 2.90323 5.22581 3.24985 5.22581 3.67742C5.22581 4.10499 5.57241 4.45161 6 4.45161C6.42759 4.45161 6.77419 4.10499 6.77419 3.67742Z"
          fill="#FA5252"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.22581 0C2.33967 0 0 2.33967 0 5.22581V6.77419C0 9.66032 2.33967 12 5.22581 12H6.77419C9.66032 12 12 9.66032 12 6.77419V5.22581C12 2.33967 9.66032 0 6.77419 0H5.22581ZM1.16129 5.22581C1.16129 2.98103 2.98103 1.16129 5.22581 1.16129H6.77419C9.01896 1.16129 10.8387 2.98104 10.8387 5.22581V6.77419C10.8387 9.01896 9.01896 10.8387 6.77419 10.8387H5.22581C2.98104 10.8387 1.16129 9.01896 1.16129 6.77419V5.22581Z"
          fill="#FA5252"
        />
      </svg>
      <span>{error}</span>
    </span>
  );

  return (
    <>
      <Input.Wrapper error={error && errorLabel} className=" lg:my-6 my-3">
        <Input
          type="text"
          placeholder="Apply Coupon"
          value={coupon}
          onChange={handleChange}
          rightSection={
            !isValidCoupon ? (
              <button onClick={handleCoupon} className=" z-10 cursor-pointer text-themeBlue text-sm font-medium mr-6">
                Apply
              </button>
            ) : (
              <button
                onClick={() => {
                  setCoupon('');
                  setIsValidCoupon(false);
                }}
              >
                {closeIcon}
              </button>
            )
          }
          leftSection={isValidCoupon && approvedIcon}
          rightSectionPointerEvents="auto"
          error={error}
          className={'  w-full cursor-pointer '}
        ></Input>
      </Input.Wrapper>
    </>
  );
}
