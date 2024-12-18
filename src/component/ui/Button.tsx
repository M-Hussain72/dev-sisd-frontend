import { ButtonHTMLAttributes } from 'react';

type ButtonSpreadProps = {
  children: string | JSX.Element | JSX.Element[];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonSpreadProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="py-3 xs:px-6 px-4 text-[#FAFAFA] xs:text-base font-semibold text-xs text-nowrap border-[1px] bg-[#307EE1] hover:bg-[#3c67ca] capitalize  rounded-lg disabled:cursor-not-allowed disabled:bg-[#307de1d5]"
    >
      {children}
    </button>
  );
};

export default Button;
