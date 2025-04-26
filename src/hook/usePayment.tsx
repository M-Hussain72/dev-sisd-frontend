import { useContext } from 'react';
import { PaymentContext } from '../context/paymentContext';

export default function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within an PaymentProvider');
  }
  return context;
}
