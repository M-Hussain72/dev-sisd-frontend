export default function Divider({ color }: { color?: string }) {
  return <div className={' border-b-[1px] w-full ' + (!color ? ' border-gray-300' : color)}></div>;
}
