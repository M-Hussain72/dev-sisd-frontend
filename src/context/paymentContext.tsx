import { createContext, useContext, useRef, useState } from 'react';

export interface PaymentContextType {
  selectOption: 'creditCard' | 'payPal';
  setSelectOption: React.Dispatch<React.SetStateAction<'creditCard' | 'payPal'>>;
  handleSubmit: () => void;
  onSubmit: () => void;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [selectOption, setSelectOption] = useState<'creditCard' | 'payPal'>('payPal');
  function onSubmit() {}
  function handleSubmit() {}
  return (
    <PaymentContext.Provider value={{ onSubmit, setSelectOption, handleSubmit, selectOption }}>
      {children}
    </PaymentContext.Provider>
  );
}
