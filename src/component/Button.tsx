type props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function ({ children }: props) {
  return (
    <button className="py-3 xs:px-6 px-4 text-[#FAFAFA] xs:text-base text-xs text-nowrap border-[1px] bg-[#307EE1] hover:bg-[#3c67ca] capitalize  rounded-lg">
      {children}
    </button>
  );
}
