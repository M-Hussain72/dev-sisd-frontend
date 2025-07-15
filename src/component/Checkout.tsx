import CartCard from './helper/CartCard';
import PaymentSummary from './Checkout/PaymentSummary';
import PaymentMethod from './Checkout/PaymentMethod';
import SearchableSelect from './helper/SearchableSelect';
import { useCart } from '../hook/useCart';

const countries = ['pakistan', 'india', 'USA1', 'China2', 'pakistan3', 'india1', 'USA', 'China', 'few'];

export default function CheckOut() {
  const { data } = useCart();
  return (
    <div className="lg:flex justify-between gap-10 sm:mx-10 mx-4 mt-10">
      <div className=" max-w-[900px] flex-1 ">
        <h1 className=" xs:text-resHeading text-xl text-themeBlack font-bold">Checkout</h1>
        <div className=" mt-6">
          <h2 className="my-2 xs:text-[24px] text-xl font-semibold text-themeBlack">Billing Address</h2>
          <div className=" xs:mt-6 mt-3">
            <SearchableSelect options={countries} />
          </div>
          <div className=" xs:mt-8 mt-4 ">
            <div className="flex justify-between mb-3">
              <h2 className=" xs:text-[24px] text-xl font-semibold text-themeBlack">Payment Method</h2>
              <p className="flex items-center gap-1 cursor-default">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.52294 12.8028C6.52294 13.2588 6.15327 13.6284 5.69726 13.6284C5.24124 13.6284 4.87157 13.2588 4.87157 12.8028C4.87157 12.3467 5.24124 11.9771 5.69726 11.9771C6.15327 11.9771 6.52294 12.3467 6.52294 12.8028Z"
                    fill="#307EE1"
                  />
                  <path
                    d="M9.82569 12.8028C9.82569 13.2588 9.45603 13.6284 9.00001 13.6284C8.54397 13.6284 8.17431 13.2588 8.17431 12.8028C8.17431 12.3467 8.54397 11.9771 9.00001 11.9771C9.45603 11.9771 9.82569 12.3467 9.82569 12.8028Z"
                    fill="#307EE1"
                  />
                  <path
                    d="M13.1284 12.8028C13.1284 13.2588 12.7588 13.6284 12.3028 13.6284C11.8467 13.6284 11.4771 13.2588 11.4771 12.8028C11.4771 12.3467 11.8467 11.9771 12.3028 11.9771C12.7588 11.9771 13.1284 12.3467 13.1284 12.8028Z"
                    fill="#307EE1"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.30467 6.04827C3.38361 2.97227 5.90062 0.502661 8.99502 0.5H9.00581C12.0759 0.503048 14.5774 2.93449 14.6931 5.97701C14.6952 6.03168 14.6965 6.08659 14.697 6.1417L14.6972 6.17508L14.6973 6.19724V7.15811C14.8448 7.17011 14.9856 7.18482 15.1198 7.20287C15.8767 7.30461 16.533 7.52488 17.0568 8.04869C17.5807 8.57255 17.8009 9.22883 17.9027 9.98574C18 10.7099 18 11.6271 18 12.7495V12.856C18 13.9784 18 14.8956 17.9027 15.6198C17.8009 16.3767 17.5807 17.033 17.0568 17.5568C16.533 18.0806 15.8767 18.3009 15.1198 18.4027C14.3961 18.5 13.9743 18.5 12.8534 18.5H5.6424C4.5207 18.5 3.60402 18.5 2.88022 18.4027C2.12327 18.3009 1.46701 18.0806 0.943172 17.5568C0.419336 17.033 0.199085 16.3767 0.0973175 15.6198C-4.76183e-05 14.8956 -2.34276e-05 13.9784 7.62484e-07 12.856V12.7495C-2.34276e-05 11.6271 -4.76183e-05 10.7099 0.0973175 9.98574C0.199085 9.22883 0.419336 8.57255 0.943172 8.04869C1.46701 7.52488 2.12327 7.30461 2.88022 7.20287C3.01441 7.18482 3.15523 7.17011 3.30276 7.15811V6.19724C3.30276 6.14745 3.3034 6.09782 3.30467 6.04827ZM5.69725 17.0138H12.7982C13.9869 17.0138 14.3082 17.0122 14.9217 16.9297C15.5139 16.8501 15.8042 16.7076 16.0059 16.5059C16.2076 16.3042 16.3501 16.0138 16.4297 15.4217C16.5122 14.8082 16.5138 13.9915 16.5138 12.8028C16.5138 11.6141 16.5122 10.7973 16.4297 10.1838C16.3501 9.59168 16.2076 9.3013 16.0059 9.09965C15.8042 8.89796 15.5139 8.75543 14.9217 8.67585C14.3082 8.59336 13.4915 8.59176 12.3028 8.59176H5.69725C4.50854 8.59176 3.69177 8.59336 3.07826 8.67585C2.48612 8.75543 2.19578 8.89796 1.99411 9.09965C1.79243 9.3013 1.64991 9.59168 1.5703 10.1838C1.48782 10.7973 1.48624 11.6141 1.48624 12.8028C1.48624 13.9915 1.48782 14.8082 1.5703 15.4217C1.64991 16.0138 1.79243 16.3042 1.99411 16.5059C2.19578 16.7076 2.48612 16.8501 3.07826 16.9297C3.69177 17.0122 4.50854 17.0138 5.69725 17.0138ZM13.2079 6.03362C13.1223 3.7928 11.2857 2.0006 9.02724 1.98633L9.00001 1.98624C6.67434 1.98624 4.789 3.87156 4.789 6.19724V7.10736L4.89113 7.10673C4.99259 7.1062 5.09604 7.10591 5.20146 7.10577C5.34528 7.10553 5.49281 7.10553 5.64406 7.10553H12.412C12.6911 7.10553 12.9574 7.10562 13.211 7.10736V6.19724L13.2108 6.15887L13.2104 6.12239C13.2098 6.09274 13.209 6.06313 13.2079 6.03362Z"
                    fill="#307EE1"
                  />
                </svg>
                <span className=" xs:block hidden text-lg text-themeGray">Secure connection</span>
              </p>
            </div>

            <PaymentMethod />
          </div>
          <h2 className="my-2 xs:mt-8 mt-4 xs:text-[24px] text-xl font-semibold text-themeBlack">Course Details</h2>
          <div className="my-4">
            {/* <CartCard product={} type="checkout" /> */}
            <ul className=" space-y-4">
              {data &&
                data?.cart.items.map((value, index) => (
                  <>
                    <li key={index}>
                      <CartCard product={value} type="checkout" />
                    </li>
                    {data?.cart.items.length != 1 && data?.cart.items.length != index + 1 && (
                      <div className="border-b-[1px] w-full border-gray-300"></div>
                    )}
                  </>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <PaymentSummary />
      </div>
    </div>
  );
}
