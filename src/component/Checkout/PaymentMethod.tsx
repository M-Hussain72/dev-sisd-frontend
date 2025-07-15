import { Radio, Tabs } from '@mantine/core';
import CreditCardPayment from './CreditCardPayment';
import usePayment from '../../hook/usePayment';

export default function PaymentMethod() {
  const { selectOption, setSelectOption } = usePayment();

  function handleChange(value: string | null) {
    if (value === 'creditCard') {
      setSelectOption(value);
    }
    if (value === 'payPal') {
      setSelectOption(value);
    }
  }

  return (
    <Tabs variant="unstyled" value={selectOption} onChange={handleChange}>
      <Tabs.List className=" relative ">
        <Tabs.Tab value="creditCard" c={'#949697'} className="z-1 items-center ">
          <Radio
            label="credit card"
            styles={{
              label: {
                fontSize: '18px',
              },
              radio: {
                width: '20px',
                height: '20px',
                borderRadius: '8.5px',
              },
            }}
            checked={'creditCard' === selectOption}
            className=" capitalize"
          ></Radio>
        </Tabs.Tab>
        <Tabs.Tab value="payPal" c={'#949697'} className="z-1 text-xl">
          <Radio
            label="payPal"
            styles={{
              label: {
                fontSize: '18px',
              },
              radio: {
                width: '20px',
                height: '20px',
                borderRadius: '8.5px',
              },
            }}
            checked={'payPal' === selectOption}
            className="capitalize"
          />
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="creditCard">
        <CreditCardPayment />
      </Tabs.Panel>
      <Tabs.Panel value="payPal">
        <div className=" flex gap-2 items-center mt-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.9677 10C10.9677 9.46553 10.5345 9.03226 10 9.03226C9.46553 9.03226 9.03226 9.46553 9.03226 10V15.1613C9.03226 15.6958 9.46553 16.129 10 16.129C10.5345 16.129 10.9677 15.6958 10.9677 15.1613V10Z"
              fill="#307EE1"
            />
            <path
              d="M11.2903 6.12903C11.2903 5.41641 10.7126 4.83871 10 4.83871C9.28735 4.83871 8.70968 5.41641 8.70968 6.12903C8.70968 6.84165 9.28735 7.41935 10 7.41935C10.7126 7.41935 11.2903 6.84165 11.2903 6.12903Z"
              fill="#307EE1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.70968 0C3.89945 0 0 3.89945 0 8.70968V11.2903C0 16.1005 3.89945 20 8.70968 20H11.2903C16.1005 20 20 16.1005 20 11.2903V8.70968C20 3.89945 16.1005 0 11.2903 0H8.70968ZM1.93548 8.70968C1.93548 4.96839 4.96839 1.93548 8.70968 1.93548H11.2903C15.0316 1.93548 18.0645 4.96839 18.0645 8.70968V11.2903C18.0645 15.0316 15.0316 18.0645 11.2903 18.0645H8.70968C4.96839 18.0645 1.93548 15.0316 1.93548 11.2903V8.70968Z"
              fill="#307EE1"
            />
          </svg>

          <p className=" text-themeGray">
            In order to complete your transaction, we will transfer you to PayPal’s secure servers.
          </p>
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}
