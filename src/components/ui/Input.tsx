import { InputHTMLAttributes } from 'react';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: Iprops) {
  return (
    <input
      className="border-[1px] border-gray-300 focus:ring-[1.5px] focus:outline-none focus:border-indigo-500 shadow-md rounded-lg focus:ring-indigo-500 p-3 font-medium"
      {...rest}
    />
  );
}

export default Input;
